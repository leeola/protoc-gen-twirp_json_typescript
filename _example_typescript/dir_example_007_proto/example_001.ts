//
// generated file, do not modify
//

export enum Bar {
  UNKNOWN = 0,
  BAR_FOO = 1,
}

export interface Foo {
  fooInt32: number
  fooInt64: number
  fooUint32: number
  fooUint64: number
  fooSint32: number
  fooSint64: number
  fooFixed32: number
  fooFixed64: number
  fooSfixed32: number
  fooSfixed64: number
  fooFloat: number
  fooDouble: number
  fooString: string
  fooBool: boolean
  fooBytes: string
  bar: Bar
  baz: Baz
}

export interface Baz {
  baz: string
}

export function FooToJSON(t: Foo): object {
  return {
    foo_int32: t.fooInt32,
    foo_int64: t.fooInt64,
    foo_uint32: t.fooUint32,
    foo_uint64: t.fooUint64,
    foo_sint32: t.fooSint32,
    foo_sint64: t.fooSint64,
    foo_fixed32: t.fooFixed32,
    foo_fixed64: t.fooFixed64,
    foo_sfixed32: t.fooSfixed32,
    foo_sfixed64: t.fooSfixed64,
    foo_float: t.fooFloat,
    foo_double: t.fooDouble,
    foo_string: t.fooString,
    foo_bool: t.fooBool,
    foo_bytes: t.fooBytes,
    bar: t.bar,
    baz: BazToJSON(t.baz),
  }
}
export function FooFromJSON(json: any): Foo {
  return {
    fooInt32: json.foo_int32,
    fooInt64: json.foo_int64,
    fooUint32: json.foo_uint32,
    fooUint64: json.foo_uint64,
    fooSint32: json.foo_sint32,
    fooSint64: json.foo_sint64,
    fooFixed32: json.foo_fixed32,
    fooFixed64: json.foo_fixed64,
    fooSfixed32: json.foo_sfixed32,
    fooSfixed64: json.foo_sfixed64,
    fooFloat: json.foo_float,
    fooDouble: json.foo_double,
    fooString: json.foo_string,
    fooBool: json.foo_bool,
    fooBytes: json.foo_bytes,
    bar: json.bar,
    baz: BazFromJSON(json.baz),
  }
}

export function BazToJSON(t: Baz): object {
  return {
    baz: t.baz,
  }
}
export function BazFromJSON(json: any): Baz {
  return {
    baz: json.baz,
  }
}
