//
// generated file, do not modify
//

export enum Foo_Baz {
  UNKNOWN = 0,
  BAZ = 1,
}

export interface Foo_Bar {
  bar: string
}

export interface Foo {
  foo: string

  // field type of embedded type.
  bar: Foo_Bar
  baz: Foo_Baz
}
