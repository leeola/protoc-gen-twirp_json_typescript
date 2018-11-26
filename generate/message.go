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

	typeAliases := map[string]string{}

	nestedPrefix := messageName
	for _, nested := range m.GetEnumType() {
		nestedName := nested.GetName()
		nestedType := messageName + "." + nestedName
		typeAliases[nestedType] = messageName + "_" + nestedName
		if err := Enum(w, nestedPrefix, nested); err != nil {
			return fmt.Errorf("Enum: %v", err)
		}
	}

	for i, nested := range m.GetNestedType() {
		nestedName := nested.GetName()
		nestedType := messageName + "." + nestedName
		typeAliases[nestedType] = messageName + "_" + nestedName
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

			// if it's aliased, replace the type name.
			if alias, ok := typeAliases[typeName]; ok {
				typeName = alias
			}

			tsType = typeName

		default:
			return fmt.Errorf("unhandled type: %v", t)
		}

		fieldName := strcase.ToLowerCamel(f.GetName())
		w.Pf("  %s: %s\n", fieldName, tsType)
	}

	w.P("}")

	return nil
}

func MessageJSON(w *Writer, file *descriptor.FileDescriptorProto, prefix string, m *descriptor.DescriptorProto) error {
	packageName := file.GetPackage()

	var messageName string
	if prefix == "" {
		messageName = m.GetName()
	} else {
		messageName = prefix + "_" + m.GetName()
	}

	nestedPrefix := messageName
	for _, nested := range m.GetNestedType() {
		if err := MessageJSON(w, file, nestedPrefix, nested); err != nil {
			return fmt.Errorf("Message: %v", err)
		}
	}

	w.P()
	w.Pf("export function %sToJSON(t: %s): object {\n", messageName, messageName)
	w.P("  return {")
	for _, f := range m.GetField() {
		fieldName := strcase.ToLowerCamel(f.GetName())
		jsonName := f.GetName()
		switch t := f.GetType(); t {
		case descriptor.FieldDescriptorProto_TYPE_MESSAGE:
			typeName := f.GetTypeName()[1:] // remove . prefix
			log.Info().Msgf("Typename:%s, pkg:%s", typeName, packageName)
			typeName, err := embedCase(typeName)
			if err != nil {
				return fmt.Errorf("embedCase: %v", err)
			}
			typeName = stripLocalType(packageName, typeName)
			w.Pf("    %s: %sToJSON(t.%s),\n", jsonName, typeName, fieldName)
		default:
			w.Pf("    %s: t.%s,\n", jsonName, fieldName)
		}
	}
	w.P("  }")
	w.P("}")

	w.Pf("export function %sFromJSON(json: any): %s {\n", messageName, messageName)
	w.P("  return {")
	for _, f := range m.GetField() {
		fieldName := strcase.ToLowerCamel(f.GetName())
		jsonName := f.GetName()
		switch t := f.GetType(); t {
		case descriptor.FieldDescriptorProto_TYPE_MESSAGE:
			typeName := f.GetTypeName()[1:] // remove . prefix
			typeName, err := embedCase(typeName)
			if err != nil {
				return fmt.Errorf("embedCase: %v", err)
			}
			typeName = stripLocalType(packageName, typeName)
			w.Pf("    %s: %sFromJSON(json.%s),\n", fieldName, typeName, jsonName)
		default:
			w.Pf("    %s: json.%s,\n", fieldName, jsonName)
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
