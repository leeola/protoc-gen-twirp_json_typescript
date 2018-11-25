package generate

import (
	"fmt"
	"strings"

	"github.com/golang/protobuf/protoc-gen-go/descriptor"
	"github.com/iancoleman/strcase"
	"github.com/rs/zerolog/log"
)

// optionalFields is a placeholder for a future protobuf option,
// causing the interface fields to be rendered as optional rather
// than required.
//
// TODO(leeola): convert this field to be supplied by a proto option.
const optionalFields = true // default true for now, my pref

func Message(w *Writer, file *descriptor.FileDescriptorProto, prefix string, m *descriptor.DescriptorProto, pathLoc PathLoc) error {
	packageName := file.GetPackage()

	// oneof not yet supported
	if oneofs := m.GetOneofDecl(); len(oneofs) > 0 {
		return fmt.Errorf("oneof not yet supported")
	}

	var messageName string
	if prefix == "" {
		messageName = m.GetName()
	} else {
		messageName = prefix + "_" + m.GetName()
	}

	nestedPrefix := messageName
	for _, nested := range m.GetEnumType() {
		if err := Enum(w, nestedPrefix, nested); err != nil {
			return fmt.Errorf("Enum: %v", err)
		}
	}

	for i, nested := range m.GetNestedType() {
		if err := Message(w, file, nestedPrefix, nested, pathLoc.NestMessage(i)); err != nil {
			return fmt.Errorf("Message: %v", err)
		}
	}

	w.P()

	for _, line := range pathLoc.LeadingComments() {
		w.Pf("//%s\n", line)
	}

	w.Pf("export interface %s {\n", messageName)

	for i, f := range m.GetField() {
		fieldPathLoc := pathLoc.NestField(i)

		if lines := fieldPathLoc.LeadingComments(); len(lines) > 0 {
			if i != 0 {
				w.P()
			}

			for _, line := range lines {
				w.Pf("  //%s\n", line)
			}
		}

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
		case descriptor.FieldDescriptorProto_TYPE_BYTES:
			// not sure what type to represent bytes as, in JS.
			// .. this is largely experimental, to make gogoproto work.
			tsType = "string"
			log.Warn().Msg("TypeBytes is not yet tested")
		case descriptor.FieldDescriptorProto_TYPE_ENUM,
			descriptor.FieldDescriptorProto_TYPE_MESSAGE:
			typeName := f.GetTypeName()[1:] // remove . prefix
			if strings.HasPrefix(typeName, packageName) {
				typeName = strings.TrimPrefix(typeName, packageName+".")
			}
			// replace Foo.Bar.Baz embedded type names, with
			// underscore variants.
			//
			// This might behacky, but in theory dots cannot exist in type names,
			// so if there is a dot it's an embedded usage. If a problem arrises here,
			// a more robust solution may be needed.
			tsType = strings.Replace(typeName, ".", "_", -1)
		default:
			return fmt.Errorf("unhandled type: %v", t)
		}

		fieldName := strcase.ToLowerCamel(f.GetName())
		w.Pf("  %s: %s\n", fieldName, tsType)
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
