package generate

import (
	"fmt"
	"strings"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func ServiceInterface(w *Writer, f *descriptor.FileDescriptorProto, s *descriptor.ServiceDescriptorProto) error {
	w.P()
	w.Pf("export interface %s {\n", s.GetName())

	filePackageName := f.GetPackage()

	for _, m := range s.GetMethod() {
		methodName := m.GetName()
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
		inputName := strings.ToLower(inputTypeName)
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

		w.Pf("  %s: (%s: %s) => Promise<%s>\n", methodName, inputName, inputType, outputType)
	}

	w.P("}")

	return nil
}

func ServiceImplementation(w *Writer, f *descriptor.FileDescriptorProto, s *descriptor.ServiceDescriptorProto) error {
	filePackageName := f.GetPackage()
	serviceName := s.GetName()

	w.P()
	w.Pf("export class %sImpl implements %s {\n", serviceName, serviceName)
	w.P("  private twirpAddr: string")
	w.P("  private fetch?: (input: any) => Promise<Response>")

	w.P()
	w.P("  constructor(twirpAddr: string) {")
	w.P("    this.twirpAddr = twirpAddr")
	w.P("  }")

	for _, m := range s.GetMethod() {
		methodName := m.GetName()

		inputType := m.GetInputType()
		inputPackageName, inputTypeName, err := splitPackageType(inputType)
		if err != nil {
			return fmt.Errorf("method %s input splitPackageType: %v", methodName, err)
		}
		inputName := strings.ToLower(inputTypeName)
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
		w.Pf("  %s(%s: %s): Promise<%s> {\n", methodName, inputName, inputType, outputType)
		w.Pf("    const url = `${this.twirpAddr}/twirp/%s.%s/%s`\n", filePackageName, serviceName, methodName)
		w.P("    return fetch(url).then((res) => res.json())")
		w.P("  }")
	}

	w.P("}")

	return nil
}

// splitPackageType returns a package and type separately.
//
// Formatting is expected to be in protobuf AST style, `.package.Type`.
func splitPackageType(packageTypeName string) (packageName, typeName string, err error) {
	split := strings.SplitN(packageTypeName, ".", 3)
	if len(split) != 3 {
		return "", "", fmt.Errorf("unexpected package.type format: %q", typeName)
	}

	return split[1], split[2], nil
}
