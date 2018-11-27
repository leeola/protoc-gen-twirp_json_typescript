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

func Message(w *Writer, file *descriptor.FileDescriptorProto, parentType string, m *descriptor.DescriptorProto,
	pathLoc PathLoc, types Types) error {

	packageName := file.GetPackage()

	// oneof not yet supported
	if oneofs := m.GetOneofDecl(); len(oneofs) > 0 {
		return fmt.Errorf("oneof not yet supported")
	}

	t := types.SetType(packageName, parentType, m.GetName())
	messageName := t.LocalTypeName

	for _, nested := range m.GetEnumType() {
		if err := Enum(w, file, t.Type, nested, types); err != nil {
			return fmt.Errorf("Enum: %v", err)
		}
	}

	for i, nested := range m.GetNestedType() {
		if err := Message(w, file, t.Type, nested, pathLoc.NestMessage(i), types); err != nil {
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
			tsType = types.SetField(packageName, f.GetTypeName()).TypeName(packageName)
		default:
			return fmt.Errorf("unhandled type: %v", t)
		}

		fieldName := strcase.ToCamel(f.GetName())
		lowerCamelFieldName := strcase.ToLowerCamel(fieldName)
		w.Pf("  %s?: %s\n", lowerCamelFieldName, tsType)
	}

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
		case descriptor.FieldDescriptorProto_TYPE_BYTES:
			// not sure what type to represent bytes as, in JS.
			// .. this is largely experimental, to make gogoproto work.
			tsType = "string"
			log.Warn().Msg("TypeBytes is not yet tested")
		case descriptor.FieldDescriptorProto_TYPE_ENUM,
			descriptor.FieldDescriptorProto_TYPE_MESSAGE:
			tsType = types.SetField(packageName, f.GetTypeName()).TypeName(packageName)
		default:
			return fmt.Errorf("unhandled type: %v", t)
		}

		fieldName := strcase.ToCamel(f.GetName())
		w.Pf("  get%s: () => %s\n", fieldName, tsType)
	}

	w.P("}")

	return nil
}

func MessageJSON(w *Writer, file *descriptor.FileDescriptorProto, prefix string, m *descriptor.DescriptorProto, types Types) error {
	packageName := file.GetPackage()

	var messageName string
	if prefix == "" {
		messageName = m.GetName()
	} else {
		messageName = prefix + "_" + m.GetName()
	}

	nestedPrefix := messageName
	for _, nested := range m.GetNestedType() {
		if err := MessageJSON(w, file, nestedPrefix, nested, types); err != nil {
			return fmt.Errorf("Message: %v", err)
		}
	}

	w.P()
	w.Pf("export function %sMarshal(t?: %s): object {\n", messageName, messageName)
	w.P("  if (!t) { return null }")
	w.P("  return {")
	for _, f := range m.GetField() {
		fieldName := strcase.ToLowerCamel(f.GetName())
		jsonName := f.GetName()
		switch t := f.GetType(); t {
		case descriptor.FieldDescriptorProto_TYPE_MESSAGE:
			t := types.SetField(packageName, f.GetTypeName()).TypeName(packageName)
			w.Pf("    %s: %sMarshal(t.%s),\n", jsonName, t, fieldName)
		default:
			w.Pf("    %s: t.%s,\n", jsonName, fieldName)
		}
	}
	w.P("  }")
	w.P("}")

	w.Pf("export function %sUnmarshal(json: any): %s {\n", messageName, messageName)
	w.P("  if (!json) { return null }")
	w.P("  return {")
	for _, f := range m.GetField() {
		upperCamelFieldName := strcase.ToCamel(f.GetName())
		lowerCamelFieldName := strcase.ToLowerCamel(upperCamelFieldName)
		jsonName := lowerCamelFieldName

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
			w.Pf("    %s: json.%s,\n", lowerCamelFieldName, jsonName)
			w.Pf("    get%s: () => this.%s ? this.%s : 0,\n", upperCamelFieldName, lowerCamelFieldName, lowerCamelFieldName)
		case descriptor.FieldDescriptorProto_TYPE_STRING:
			w.Pf("    %s: json.%s,\n", lowerCamelFieldName, jsonName)
			w.Pf("    get%s: () => this.%s ? this.%s : \"\",\n", upperCamelFieldName, lowerCamelFieldName, lowerCamelFieldName)
		case descriptor.FieldDescriptorProto_TYPE_BOOL:
			w.Pf("    %s: json.%s,\n", lowerCamelFieldName, jsonName)
			w.Pf("    get%s: () => this.%s ? this.%s : false,\n", upperCamelFieldName, lowerCamelFieldName, lowerCamelFieldName)
		case descriptor.FieldDescriptorProto_TYPE_BYTES:
			w.Pf("    %s: json.%s,\n", lowerCamelFieldName, jsonName)
			w.Pf("    get%s: () => this.%s ? this.%s : \"\",\n", upperCamelFieldName, lowerCamelFieldName, lowerCamelFieldName)
		case descriptor.FieldDescriptorProto_TYPE_ENUM:
			w.Pf("    %s: json.%s,\n", lowerCamelFieldName, jsonName)
			w.Pf("    get%s: () => this.%s ? this.%s : 0,\n", upperCamelFieldName, lowerCamelFieldName, lowerCamelFieldName)
		case descriptor.FieldDescriptorProto_TYPE_MESSAGE:
			t := types.SetField(packageName, f.GetTypeName()).TypeName(packageName)
			w.Pf("    %s: %sUnmarshal(json.%s),\n", lowerCamelFieldName, t, jsonName)
			w.Pf("    get%s: () => this.%s ? this.%s : %sUnmarshal({}),\n", upperCamelFieldName, lowerCamelFieldName, lowerCamelFieldName, t)
		default:
			return fmt.Errorf("unhandled type: %v", t)
		}
	}
	w.P("  }")
	w.P("}")

	return nil
}

// embedCase returns a pkg.Foo.Bar embed type as an underscored pkg.Foo_Bar
func embedCase(typeName string) (string, error) {
	split := strings.SplitN(typeName, ".", 2)
	if len(split) != 2 {
		return "", fmt.Errorf("unexpected type format: %q", typeName)
	}
	packageName := split[0]
	typeName = strings.Replace(split[1], ".", "_", -1)
	return fmt.Sprintf("%s.%s", packageName, typeName), nil
}

func stripLocalType(packageName, typeName string) string {
	return strings.TrimPrefix(typeName, packageName+".")
}
