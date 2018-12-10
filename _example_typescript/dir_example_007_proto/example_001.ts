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
  fooInt32S?: number[]
  fooInt64S?: number[]
  fooUint32S?: number[]
  fooUint64S?: number[]
  fooSint32S?: number[]
  fooSint64S?: number[]
  fooFixed32S?: number[]
  fooFixed64S?: number[]
  fooSfixed32S?: number[]
  fooSfixed64S?: number[]
  fooFloats?: number[]
  fooDoubles?: number[]
  fooStrings?: string[]
  fooBools?: boolean[]
  fooBytess?: string[]
  bars?: Bar[]
  bazs?: Baz[]
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
    foo_int32s: t.fooInt32S,
    foo_int64s: t.fooInt64S,
    foo_uint32s: t.fooUint32S,
    foo_uint64s: t.fooUint64S,
    foo_sint32s: t.fooSint32S,
    foo_sint64s: t.fooSint64S,
    foo_fixed32s: t.fooFixed32S,
    foo_fixed64s: t.fooFixed64S,
    foo_sfixed32s: t.fooSfixed32S,
    foo_sfixed64s: t.fooSfixed64S,
    foo_floats: t.fooFloats,
    foo_doubles: t.fooDoubles,
    foo_strings: t.fooStrings,
    foo_bools: t.fooBools,
    foo_bytess: t.fooBytess,
    bars: t.bars,
    bazs: t.bazs ? t.bazs.map((elm) => BazMarshal(elm)) : undefined,
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
    fooInt32S: json.foo_int32s,
    fooInt64S: json.foo_int64s,
    fooUint32S: json.foo_uint32s,
    fooUint64S: json.foo_uint64s,
    fooSint32S: json.foo_sint32s,
    fooSint64S: json.foo_sint64s,
    fooFixed32S: json.foo_fixed32s,
    fooFixed64S: json.foo_fixed64s,
    fooSfixed32S: json.foo_sfixed32s,
    fooSfixed64S: json.foo_sfixed64s,
    fooFloats: json.foo_floats,
    fooDoubles: json.foo_doubles,
    fooStrings: json.foo_strings,
    fooBools: json.foo_bools,
    fooBytess: json.foo_bytess,
    bars: json.bars,
    bazs: json.bazs ? json.bazs.map((elm) => BazUnmarshal(elm)) : undefined,
  }
}
export class FooGetter {
  public Foo: Foo
  constructor(o?: Foo) {
    this.Foo = o
  }
  getFooInt32: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooInt32 ? this.Foo.fooInt32 : 0 }
  getFooInt64: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooInt64 ? this.Foo.fooInt64 : 0 }
  getFooUint32: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooUint32 ? this.Foo.fooUint32 : 0 }
  getFooUint64: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooUint64 ? this.Foo.fooUint64 : 0 }
  getFooSint32: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooSint32 ? this.Foo.fooSint32 : 0 }
  getFooSint64: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooSint64 ? this.Foo.fooSint64 : 0 }
  getFooFixed32: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooFixed32 ? this.Foo.fooFixed32 : 0 }
  getFooFixed64: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooFixed64 ? this.Foo.fooFixed64 : 0 }
  getFooSfixed32: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooSfixed32 ? this.Foo.fooSfixed32 : 0 }
  getFooSfixed64: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooSfixed64 ? this.Foo.fooSfixed64 : 0 }
  getFooFloat: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooFloat ? this.Foo.fooFloat : 0 }
  getFooDouble: () => number = () => { if (!this.Foo) { return 0 }; return this.Foo.fooDouble ? this.Foo.fooDouble : 0 }
  getFooString: () => string = () => { if (!this.Foo) { return "" }; return this.Foo.fooString ? this.Foo.fooString : "" }
  getFooBool: () => boolean = () => { if (!this.Foo) { return false }; return this.Foo.fooBool ? this.Foo.fooBool : false }
  getFooBytes: () => string = () => { if (!this.Foo) { return "" }; return this.Foo.fooBytes ? this.Foo.fooBytes : "" }
  getBar: () => Bar = () => { if (!this.Foo) { return 0 }; return this.Foo.bar ? this.Foo.bar : 0 }
  getBaz: () => Baz = () => { if (!this.Foo) { return BazUnmarshal({}) }; return this.Foo.baz ? this.Foo.baz : BazUnmarshal({}) }
  getFooInt32S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooInt32S ? this.Foo.fooInt32S : [] }
  getFooInt64S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooInt64S ? this.Foo.fooInt64S : [] }
  getFooUint32S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooUint32S ? this.Foo.fooUint32S : [] }
  getFooUint64S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooUint64S ? this.Foo.fooUint64S : [] }
  getFooSint32S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooSint32S ? this.Foo.fooSint32S : [] }
  getFooSint64S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooSint64S ? this.Foo.fooSint64S : [] }
  getFooFixed32S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooFixed32S ? this.Foo.fooFixed32S : [] }
  getFooFixed64S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooFixed64S ? this.Foo.fooFixed64S : [] }
  getFooSfixed32S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooSfixed32S ? this.Foo.fooSfixed32S : [] }
  getFooSfixed64S: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooSfixed64S ? this.Foo.fooSfixed64S : [] }
  getFooFloats: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooFloats ? this.Foo.fooFloats : [] }
  getFooDoubles: () => number[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooDoubles ? this.Foo.fooDoubles : [] }
  getFooStrings: () => string[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooStrings ? this.Foo.fooStrings : [] }
  getFooBools: () => boolean[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooBools ? this.Foo.fooBools : [] }
  getFooBytess: () => string[] = () => { if (!this.Foo) { return [] }; return this.Foo.fooBytess ? this.Foo.fooBytess : [] }
  getBars: () => Bar[] = () => { if (!this.Foo) { return [] }; return this.Foo.bars ? this.Foo.bars : [] }
  getBazs: () => Baz[] = () => { if (!this.Foo) { return [] }; return this.Foo.bazs ? this.Foo.bazs : [] }
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
  constructor(o?: Baz) {
    this.Baz = o
  }
  getBaz: () => string = () => { if (!this.Baz) { return "" }; return this.Baz.baz ? this.Baz.baz : "" }
}
