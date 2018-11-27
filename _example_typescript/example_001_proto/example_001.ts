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
}

export interface Baz {
  baz?: string
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
    baz: BazUnmarshal(json.baz),
  }
}
export class FooGetter {
  public Foo: Foo
  constructor(o: Foo) {
    this.Foo = o
  }
  getFooInt32 = () => this.Foo.fooInt32 ? this.Foo.fooInt32 : 0
  getFooInt64 = () => this.Foo.fooInt64 ? this.Foo.fooInt64 : 0
  getFooUint32 = () => this.Foo.fooUint32 ? this.Foo.fooUint32 : 0
  getFooUint64 = () => this.Foo.fooUint64 ? this.Foo.fooUint64 : 0
  getFooSint32 = () => this.Foo.fooSint32 ? this.Foo.fooSint32 : 0
  getFooSint64 = () => this.Foo.fooSint64 ? this.Foo.fooSint64 : 0
  getFooFixed32 = () => this.Foo.fooFixed32 ? this.Foo.fooFixed32 : 0
  getFooFixed64 = () => this.Foo.fooFixed64 ? this.Foo.fooFixed64 : 0
  getFooSfixed32 = () => this.Foo.fooSfixed32 ? this.Foo.fooSfixed32 : 0
  getFooSfixed64 = () => this.Foo.fooSfixed64 ? this.Foo.fooSfixed64 : 0
  getFooFloat = () => this.Foo.fooFloat ? this.Foo.fooFloat : 0
  getFooDouble = () => this.Foo.fooDouble ? this.Foo.fooDouble : 0
  getFooString = () => this.Foo.fooString ? this.Foo.fooString : ""
  getFooBool = () => this.Foo.fooBool ? this.Foo.fooBool : false
  getFooBytes = () => this.Foo.fooBytes ? this.Foo.fooBytes : ""
  getBar = () => this.Foo.bar ? this.Foo.bar : 0
  getBaz = () => this.Foo.baz ? this.Foo.baz : BazUnmarshal({})
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
  }
}
export class BazGetter {
  public Baz: Baz
  constructor(o: Baz) {
    this.Baz = o
  }
  getBaz = () => this.Baz.baz ? this.Baz.baz : ""
}
