package generate

import (
	"bytes"
	"fmt"
	"strings"
	"text/template"

	"github.com/gogo/protobuf/proto"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
	"github.com/rs/zerolog/log"
)

func Generate(req plugin.CodeGeneratorRequest) (*plugin.CodeGeneratorResponse, error) {
	log.Info().
		Strs("files to generate", req.FileToGenerate).
		Msg("generate request")

	types := Types{}

	pkgs := map[string]string{}
	for _, file := range req.ProtoFile {
		pkgs[file.GetName()] = file.GetPackage()
	}

	var outputFiles []*plugin.CodeGeneratorResponse_File
	for _, file := range req.ProtoFile {
		var w Writer
		if err := File(&w, file, types, pkgs); err != nil {
			return nil, fmt.Errorf("File: %v", err)
		}

		name := file.GetName()
		if !strings.HasSuffix(name, ".proto") {
			return nil, fmt.Errorf("unexpected filename format: %q", name)
		}
		name = TSExt(name)

		outputFiles = append(outputFiles, &plugin.CodeGeneratorResponse_File{
			Name:    &name,
			Content: proto.String(w.String()),
		})
	}

	res := &plugin.CodeGeneratorResponse{
		File: outputFiles,
	}
	return res, nil
}

type Writer struct {
	strings.Builder

	// TODO(leeola): include indent functionality built into the Print funcs.
}

func (w *Writer) P(a ...interface{}) (int, error) {
	return w.Println(a...)
}

func (w *Writer) Pf(f string, a ...interface{}) (int, error) {
	return w.Printf(f, a...)
}

func (w *Writer) Print(a ...interface{}) (int, error) {
	return w.WriteString(fmt.Sprint(a...))
}

func (w *Writer) Printf(f string, a ...interface{}) (int, error) {
	return w.WriteString(fmt.Sprintf(f, a...))
}

func (w *Writer) Println(a ...interface{}) (int, error) {
	return w.WriteString(fmt.Sprintln(a...))
}

func (w *Writer) T(t string, m map[string]interface{}) (int, error) {
	tmpl, err := template.New("").Parse(t)
	if err != nil {
		return 0, fmt.Errorf("template Parse: %v", err)
	}
	var buf = bytes.Buffer{}
	if err := tmpl.Execute(&buf, m); err != nil {
		return 0, fmt.Errorf("template Execute: %v", err)
	}
	return w.WriteString(buf.String())
}
