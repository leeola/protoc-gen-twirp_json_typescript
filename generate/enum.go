package generate

import (
	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func Enum(w *Writer, prefix string, e *descriptor.EnumDescriptorProto) error {
	w.P()

	var enumName string
	if prefix == "" {
		enumName = e.GetName()
	} else {
		enumName = prefix + "_" + e.GetName()
	}

	w.Pf("export enum %s {\n", enumName)

	for _, v := range e.GetValue() {
		w.Pf("  %s = %d,\n", v.GetName(), v.GetNumber())
	}

	w.P("}")

	return nil
}
