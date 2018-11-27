package generate

import (
	"fmt"
	"path/filepath"
	"strings"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func Dependencies(w *Writer, f *descriptor.FileDescriptorProto, depPaths []string, pkgs map[string]string) error {
	usedTypes, err := PossibleFileImports(f)
	if err != nil {
		return fmt.Errorf("FileTypes: %v", err)
	}

	for _, depPath := range depPaths {
		inUse := false
		for _, inUseDep := range usedTypes {
			if DropExt(filepath.Base(depPath)) == inUseDep {
				inUse = true
				break
			}
		}

		if err := Dependency(w, f, depPath, inUse, pkgs); err != nil {
			return fmt.Errorf("Dependency: %v", err)
		}
	}

	return nil
}

func Dependency(w *Writer, f *descriptor.FileDescriptorProto, depPath string, inUse bool, pkgs map[string]string) error {
	depName := TSImportName(pkgs[depPath])

	relPath, err := filepath.Rel(filepath.Dir(f.GetName()), DropExt(depPath))
	if err != nil {
		return fmt.Errorf("Rel: %v", err)
	}

	if !strings.HasPrefix(relPath, ".") {
		relPath = "./" + relPath
	}

	if !inUse {
		w.P("// Following import is not in use.")
		// no newline on purpose
		w.Pf("// ")
	}

	if _, err = w.Pf("import * as %s from \"%s\"\n", depName, relPath); err != nil {
		return fmt.Errorf("Pf: %v", err)
	}

	return nil
}

func PossibleFileImports(f *descriptor.FileDescriptorProto) ([]string, error) {
	var types []string

	for _, m := range f.GetMessageType() {
		types = messageImports(types, m)
	}

	return types, nil
}

func messageImports(types []string, m *descriptor.DescriptorProto) []string {
	for _, f := range m.GetField() {
		switch t := f.GetType(); t {
		case descriptor.FieldDescriptorProto_TYPE_ENUM,
			descriptor.FieldDescriptorProto_TYPE_MESSAGE:
			typeName := strings.SplitN(f.GetTypeName(), ".", 3)[1]
			types = append(types, typeName)
		}
	}
	return types
}

// TSImportName returns the typescript importname from the protoc dependency
// value.
func TSImportName(depPackage string) string {
	return strings.Replace(depPackage, ".", "_", -1)
}

// TSExt will replace the ext with a .ts extension.
//
// Ext is determined by filepath.Ext(), which means only a single segment.
// foo.tar.gz would result in foo.tar.ts.
func TSExt(p string) string {
	return DropExt(p) + ".ts"
}

// DropExt removes the extension from p, doing nothing if no extension exists.
func DropExt(p string) string {
	ext := filepath.Ext(p)
	if ext != "" {
		return strings.TrimSuffix(p, ext)
	}
	return p
}
