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

func EnumMarshal(w *Writer, file *descriptor.FileDescriptorProto, parent string, e *descriptor.EnumDescriptorProto, types Types) error {
	w.P()

	packageName := file.GetPackage()
	enumName := types.SetType(packageName, parent, e.GetName()).LocalTypeName

	w.Pf("export function %sMarshal(e?: %s): number | undefined {\n", enumName, enumName)
	w.P("  if (!e) { return undefined }")
	w.Pf("  switch(e) {\n")

	for _, v := range e.GetValue() {
		w.Pf("  case %s.%s:\n", enumName, v.GetName())
		w.Pf("    return %d\n", v.GetNumber())
	}

	w.P("  default:")
	w.P("    return 0") // by convention, 0 should be the unknown.
	w.P("  }")
	w.P("}")

	return nil
}

func EnumMap(w *Writer, file *descriptor.FileDescriptorProto, parent string, e *descriptor.EnumDescriptorProto, types Types) error {
	w.P()

	packageName := file.GetPackage()
	enumName := types.SetType(packageName, parent, e.GetName()).LocalTypeName

	w.Pf("export function %sMap(n: number): %s {\n", enumName, enumName)
	w.Pf("  switch(n) {\n")

	var zeroVal string
	for i, v := range e.GetValue() {
		if i == 0 {
			zeroVal = v.GetName()
		}

		w.Pf("  case %d:\n", v.GetNumber())
		w.Pf("    return %s.%s\n", enumName, v.GetName())
	}

	w.P("  default:")
	w.Pf("    return %s.%s\n", enumName, zeroVal)
	w.P("  }")
	w.P("}")

	return nil
}
