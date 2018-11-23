package generate

import (
	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

func Enum(w *Writer, e *descriptor.EnumDescriptorProto) error {
	w.P()
	w.Pf("export enum %s {\n", e.GetName())

	for _, v := range e.GetValue() {
		w.Pf("  %s = %d,\n", v.GetName(), v.GetNumber())
	}

	w.P("}")

	return nil
}
