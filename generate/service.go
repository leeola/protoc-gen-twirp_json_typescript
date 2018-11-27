package generate

import (
	"fmt"
	"strings"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	"github.com/iancoleman/strcase"
)

func ServiceInterface(w *Writer, f *descriptor.FileDescriptorProto, s *descriptor.ServiceDescriptorProto, pathLoc PathLoc) error {
	w.P()

	for _, line := range pathLoc.LeadingComments() {
		w.Pf("//%s\n", line)
	}

	w.Pf("export interface %s {\n", s.GetName())

	filePackageName := f.GetPackage()

	for i, m := range s.GetMethod() {
		fieldPathLoc := pathLoc.NestField(i)

		for _, line := range fieldPathLoc.LeadingComments() {
			w.Pf("  //%s\n", line)
		}

		methodName := strcase.ToLowerCamel(m.GetName())
		if m.GetClientStreaming() {
			return fmt.Errorf("unsupported use of Client Streaming on method: %s", methodName)
		}
		if m.GetServerStreaming() {
			return fmt.Errorf("unsupported use of Server Streaming on method: %s", methodName)
		}

		inputType := m.GetInputType()
		inputPackageName, inputTypeName, err := splitPackageType(inputType)
		if err != nil {
			return fmt.Errorf("method %s input splitPackageType: %v", methodName, err)
		}
		if filePackageName == inputPackageName {
			inputType = inputTypeName
		}

		outputType := m.GetOutputType()
		outputPackageName, outputTypeName, err := splitPackageType(outputType)
		if err != nil {
			return fmt.Errorf("method %s output splitPackageType: %v", methodName, err)
		}
		if filePackageName == outputPackageName {
			outputType = outputTypeName
		}

		w.Pf("  %s: (req: %s) => Promise<%s>\n", methodName, inputType, outputType)
	}

	w.P("}")

	return nil
}

func ServiceImplementation(w *Writer, f *descriptor.FileDescriptorProto, s *descriptor.ServiceDescriptorProto) error {
	filePackageName := f.GetPackage()
	serviceName := s.GetName()

	w.P()
	w.Pf("export class %sClient implements %s {\n", serviceName, serviceName)
	w.P("  private twirpAddr: string")
	w.P("  private fetch: (url: string, req?: object) => Promise<Response>")

	w.P()
	w.P("  constructor(twirpAddr: string, customFetch?: (url: string, req?: object) => Promise<Response>) {")
	w.P("    this.twirpAddr = twirpAddr")
	w.P("    this.fetch = customFetch ? customFetch : windowFetch")
	w.P("  }")

	for _, m := range s.GetMethod() {

		camelName := m.GetName()
		methodName := strcase.ToLowerCamel(camelName)

		inputType := m.GetInputType()
		inputPackageName, inputTypeName, err := splitPackageType(inputType)
		if err != nil {
			return fmt.Errorf("method %s input splitPackageType: %v", methodName, err)
		}
		if filePackageName == inputPackageName {
			inputType = inputTypeName
		}

		outputType := m.GetOutputType()
		outputPackageName, outputTypeName, err := splitPackageType(outputType)
		if err != nil {
			return fmt.Errorf("method %s output splitPackageType: %v", methodName, err)
		}
		if filePackageName == outputPackageName {
			outputType = outputTypeName
		}

		w.P()
		w.Pf("  %s(req: %s): Promise<%s> {\n", methodName, inputType, outputType)
		w.Pf("    const url = `${this.twirpAddr}/twirp/%s.%s/%s`\n", filePackageName, serviceName, camelName)
		w.P("    // TODO: shorten this by moving it to a twirp package, reducing generated LOC")
		w.P("    const fetchReq = {")
		w.Pf("      body: JSON.stringify(%sMarshal(req)),\n", inputType)
		w.P("      headers: { \"Content-Type\": \"application/json\" },")
		w.P("      method: \"POST\",")
		w.P("    }")
		w.P("    return this.fetch(url, fetchReq).then((res) => res.json().then((j) => {")
		w.P("      // TODO: use TwirpError type")
		w.P("      if (!res.ok) { throw new Error(j.msg) }")
		w.Pf("      const v = %sUnmarshal(j)\n", outputType)
		w.Pf("      if (!v) { throw new Error(\"%s response was undefined\") }\n", methodName)
		w.P("      return v")
		w.P("    }))")
		w.P("  }")
	}

	w.P("}")

	return nil
}

// splitPackageType returns a package and type separately.
//
// Formatting is expected to be in protobuf AST style, `.package.Type`.
func splitPackageType(packageTypeName string) (packageName, typeName string, err error) {
	i := strings.LastIndex(packageTypeName, ".")

	// if i is at 0 or -1 it's an invalid input. 1 is likely invalid too, but
	// not technically broken to this function, at least.
	if i < 1 {
		return "", "", fmt.Errorf("unexpected package.type format: %q", packageTypeName)
	}

	// drop the proceeding .
	packageName = packageTypeName[1:i]
	// drop the trailing .
	typeName = packageTypeName[i+1:]
	return packageName, typeName, nil
}
