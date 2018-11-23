//
// generated file, do not modify
//


export enum Bar {
  UNKNOWN = 0,
  BAR_FOO = 1,
}

export interface Foo {
  foo_int32: number
  foo_int64: number
  foo_uint32: number
  foo_uint64: number
  foo_sint32: number
  foo_sint64: number
  foo_fixed32: number
  foo_fixed64: number
  foo_sfixed32: number
  foo_sfixed64: number
  foo_float: number
  foo_double: number
  foo_string: string
  foo_bool: boolean
  bar: Bar
  baz: Baz
}

export interface Baz {
  baz: string
}
