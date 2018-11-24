package generate

import (
	"fmt"
	"strings"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
)

// optionalFields is a placeholder for a future protobuf option,
// causing the interface fields to be rendered as optional rather
// than required.
//
// TODO(leeola): convert this field to be supplied by a proto option.
const optionalFields = true // default true for now, my pref

func Message(w *Writer, file *descriptor.FileDescriptorProto, m *descriptor.DescriptorProto, pathLoc PathLoc) error {
	packageName := file.GetPackage()

	w.P()

	leadingComments, ok := pathLoc.LeadingComments()
	if ok {
		w.P("// ", leadingComments)
	}

	w.Pf("export interface %s {\n", m.GetName())

	for _, f := range m.GetField() {
		var tsType string
		switch t := f.GetType(); t {
		case descriptor.FieldDescriptorProto_TYPE_INT32,
			descriptor.FieldDescriptorProto_TYPE_INT64,
			descriptor.FieldDescriptorProto_TYPE_UINT32,
			descriptor.FieldDescriptorProto_TYPE_UINT64,
			descriptor.FieldDescriptorProto_TYPE_SINT32,
			descriptor.FieldDescriptorProto_TYPE_SINT64,
			descriptor.FieldDescriptorProto_TYPE_FIXED32,
			descriptor.FieldDescriptorProto_TYPE_FIXED64,
			descriptor.FieldDescriptorProto_TYPE_SFIXED32,
			descriptor.FieldDescriptorProto_TYPE_SFIXED64,
			descriptor.FieldDescriptorProto_TYPE_FLOAT,
			descriptor.FieldDescriptorProto_TYPE_DOUBLE:
			tsType = "number"
		case descriptor.FieldDescriptorProto_TYPE_STRING:
			tsType = "string"
		case descriptor.FieldDescriptorProto_TYPE_BOOL:
			tsType = "boolean"
		// case descriptor.FieldDescriptorProto_TYPE_BYTES:
		case descriptor.FieldDescriptorProto_TYPE_ENUM,
			descriptor.FieldDescriptorProto_TYPE_MESSAGE:
			typeName := f.GetTypeName()[1:] // remove . prefix
			if strings.HasPrefix(typeName, packageName) {
				typeName = strings.TrimPrefix(typeName, packageName+".")
			}
			tsType = typeName
		default:
			return fmt.Errorf("unhandled type: %v", t)
		}

		w.Pf("  %s: %s\n", f.GetName(), tsType)
	}

	w.P("}")

	return nil
}

// TSType returns the TS type string for the given proto type string.
func TSType(protoType string) (string, error) {
	switch protoType {
	default:
		return "", fmt.Errorf("unhandled proto type: %q", protoType)
	}
}
