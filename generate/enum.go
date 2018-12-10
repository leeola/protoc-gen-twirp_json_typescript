package generate

import (
	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func Enum(w *Writer, file *descriptor.FileDescriptorProto, parent string, e *descriptor.EnumDescriptorProto, types Types) error {
	w.P()

	packageName := file.GetPackage()
	enumName := types.SetType(packageName, parent, e.GetName()).LocalTypeName

	w.Pf("export enum %s {\n", enumName)

	for _, v := range e.GetValue() {
		w.Pf("  %s = \"%s\",\n", v.GetName(), v.GetName())
	}

	w.P("}")

	return nil
}
