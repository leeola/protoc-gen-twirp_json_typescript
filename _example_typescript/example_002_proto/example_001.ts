//
// generated file, do not modify
//

export enum Bar {
  UNKNOWN = 0,
  BAR_FOO = 1,
}

export interface Foo {
  fooInt32?: number
  fooInt64?: number
  fooUint32?: number
  fooUint64?: number
  fooSint32?: number
  fooSint64?: number
  fooFixed32?: number
  fooFixed64?: number
  fooSfixed32?: number
  fooSfixed64?: number
  fooFloat?: number
  fooDouble?: number
  fooString?: string
  fooBool?: boolean
  fooBytes?: string
  bar?: Bar
  baz?: Baz
  getFooInt32: () => number
  getFooInt64: () => number
  getFooUint32: () => number
  getFooUint64: () => number
  getFooSint32: () => number
  getFooSint64: () => number
  getFooFixed32: () => number
  getFooFixed64: () => number
  getFooSfixed32: () => number
  getFooSfixed64: () => number
  getFooFloat: () => number
  getFooDouble: () => number
  getFooString: () => string
  getFooBool: () => boolean
  getFooBytes: () => string
  getBar: () => Bar
  getBaz: () => Baz
}

export interface Baz {
  baz?: string
  getBaz: () => string
}

export function FooMarshal(t?: Foo): object | undefined {
  if (!t) { return undefined }
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
    baz: BazMarshal(t.baz),
  }
}
export function FooUnmarshal(this: any, json: any): Foo | undefined {
  if (!json) { return undefined }
  return {
    fooInt32: json.foo_int32,
    getFooInt32: () => this.fooInt32 ? this.fooInt32 : 0,
    fooInt64: json.foo_int64,
    getFooInt64: () => this.fooInt64 ? this.fooInt64 : 0,
    fooUint32: json.foo_uint32,
    getFooUint32: () => this.fooUint32 ? this.fooUint32 : 0,
    fooUint64: json.foo_uint64,
    getFooUint64: () => this.fooUint64 ? this.fooUint64 : 0,
    fooSint32: json.foo_sint32,
    getFooSint32: () => this.fooSint32 ? this.fooSint32 : 0,
    fooSint64: json.foo_sint64,
    getFooSint64: () => this.fooSint64 ? this.fooSint64 : 0,
    fooFixed32: json.foo_fixed32,
    getFooFixed32: () => this.fooFixed32 ? this.fooFixed32 : 0,
    fooFixed64: json.foo_fixed64,
    getFooFixed64: () => this.fooFixed64 ? this.fooFixed64 : 0,
    fooSfixed32: json.foo_sfixed32,
    getFooSfixed32: () => this.fooSfixed32 ? this.fooSfixed32 : 0,
    fooSfixed64: json.foo_sfixed64,
    getFooSfixed64: () => this.fooSfixed64 ? this.fooSfixed64 : 0,
    fooFloat: json.foo_float,
    getFooFloat: () => this.fooFloat ? this.fooFloat : 0,
    fooDouble: json.foo_double,
    getFooDouble: () => this.fooDouble ? this.fooDouble : 0,
    fooString: json.foo_string,
    getFooString: () => this.fooString ? this.fooString : "",
    fooBool: json.foo_bool,
    getFooBool: () => this.fooBool ? this.fooBool : false,
    fooBytes: json.foo_bytes,
    getFooBytes: () => this.fooBytes ? this.fooBytes : "",
    bar: json.bar,
    getBar: () => this.bar ? this.bar : 0,
    baz: BazUnmarshal(json.baz),
    getBaz: () => this.baz ? this.baz : BazUnmarshal({}),
  }
}

export function BazMarshal(t?: Baz): object | undefined {
  if (!t) { return undefined }
  return {
    baz: t.baz,
  }
}
export function BazUnmarshal(this: any, json: any): Baz | undefined {
  if (!json) { return undefined }
  return {
    baz: json.baz,
    getBaz: () => this.baz ? this.baz : "",
  }
}
