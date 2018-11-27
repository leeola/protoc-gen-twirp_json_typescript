package generate

import (
	"strings"
)

type Types map[string]Type

type Type struct {
	// Key is the full, combined type, including a proceeding `.` as provided
	// by Protobuf.
	Key string

	// Type is the type portion of the key.
	//
	// Eg, if the package is `improta.importb` in `importa.importb.Foo.Bar`,
	// this value would be `Foo.Bar`.
	Type string

	// Package is the pkg portion of the key.
	//
	// Eg, if the package is `improta.importb` in `importa.importb.Foo.Bar`,
	// this value would be `importa.importb`.
	Package string

	ParentType string

	PackageName string

	LocalTypeName string

	ImportTypeName string
}

func (ts Types) SetType(pkg, parentType, t string) Type {
	typeName := t
	if parentType != "" {
		t = parentType + "." + t
		typeName = strings.Replace(t, ".", "_", -1)
	}

	key := pkg + "." + t

	pkgName := strings.Replace(pkg, ".", "_", -1)

	typ := Type{
		Key:            key,
		Package:        pkg,
		Type:           t,
		ParentType:     parentType,
		PackageName:    pkgName,
		LocalTypeName:  typeName,
		ImportTypeName: pkgName + "." + typeName,
	}

	ts[key] = typ
	return typ
}

func (ts Types) SetField(pkg, fieldType string) Type {
	key := fieldType[1:] // drop . prefix

	if typ, ok := ts[key]; ok {
		return typ
	}

	// this will behave incorrectly if the type is declared in another
	// file yet to be seen. However, i'm banking on this never happening.
	//
	// If it does, i'll need to handle it by going through the AST to grab
	// all types beforehand so we can know what is a type and what is a package.
	t := strings.TrimPrefix(key, pkg+".")

	typeName := strings.Replace(t, ".", "_", -1)
	pkgName := strings.Replace(pkg, ".", "_", -1)

	// parent is currently empty, in theory that's okay. ?

	typ := Type{
		Key:            key,
		Type:           t,
		Package:        pkg,
		PackageName:    pkgName,
		LocalTypeName:  typeName,
		ImportTypeName: pkgName + "." + typeName,
	}

	ts[key] = typ
	return typ
}

func (t Type) TypeName(pkg string) string {
	if t.Package == pkg {
		return t.LocalTypeName
	}
	return t.ImportTypeName
}
