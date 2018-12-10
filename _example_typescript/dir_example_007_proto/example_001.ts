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
    bar: Number(Bar[json.bar]),
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
    bars: json.bars ? json.bars.map((elm) => Number(Bar[elm])) : undefined,
    bazs: json.bazs ? json.bazs.map((elm) => BazUnmarshal(elm)) : undefined,
  }
}
export class FooGetter {
  public Foo: Foo | undefined
  constructor(o?: Foo) {
    this.Foo = o
  }
  getFooInt32: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooInt32) { return 0 }
    return this.Foo.fooInt32
  }
  getFooInt64: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooInt64) { return 0 }
    return this.Foo.fooInt64
  }
  getFooUint32: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooUint32) { return 0 }
    return this.Foo.fooUint32
  }
  getFooUint64: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooUint64) { return 0 }
    return this.Foo.fooUint64
  }
  getFooSint32: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooSint32) { return 0 }
    return this.Foo.fooSint32
  }
  getFooSint64: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooSint64) { return 0 }
    return this.Foo.fooSint64
  }
  getFooFixed32: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooFixed32) { return 0 }
    return this.Foo.fooFixed32
  }
  getFooFixed64: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooFixed64) { return 0 }
    return this.Foo.fooFixed64
  }
  getFooSfixed32: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooSfixed32) { return 0 }
    return this.Foo.fooSfixed32
  }
  getFooSfixed64: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooSfixed64) { return 0 }
    return this.Foo.fooSfixed64
  }
  getFooFloat: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooFloat) { return 0 }
    return this.Foo.fooFloat
  }
  getFooDouble: () => number = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.fooDouble) { return 0 }
    return this.Foo.fooDouble
  }
  getFooString: () => string = () => {
    if (!this.Foo) { return "" }
    if (!this.Foo.fooString) { return "" }
    return this.Foo.fooString
  }
  getFooBool: () => boolean = () => {
    if (!this.Foo) { return false }
    if (!this.Foo.fooBool) { return false }
    return this.Foo.fooBool
  }
  getFooBytes: () => string = () => {
    if (!this.Foo) { return "" }
    if (!this.Foo.fooBytes) { return "" }
    return this.Foo.fooBytes
  }
  getBar: () => Bar = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.bar) { return 0 }
    return this.Foo.bar
  }
  getBaz: () => Baz = () => {
    if (!this.Foo) { const nonZero = BazUnmarshal({}); if (!nonZero) { throw new Error("nonzero returned zero value") }; return nonZero }
    if (!this.Foo.baz) { const nonZero = BazUnmarshal({}); if (!nonZero) { throw new Error("nonzero returned zero value") }; return nonZero }
    return this.Foo.baz
  }
  getFooInt32S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooInt32S) { return [] }
    return this.Foo.fooInt32S
  }
  getFooInt64S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooInt64S) { return [] }
    return this.Foo.fooInt64S
  }
  getFooUint32S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooUint32S) { return [] }
    return this.Foo.fooUint32S
  }
  getFooUint64S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooUint64S) { return [] }
    return this.Foo.fooUint64S
  }
  getFooSint32S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooSint32S) { return [] }
    return this.Foo.fooSint32S
  }
  getFooSint64S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooSint64S) { return [] }
    return this.Foo.fooSint64S
  }
  getFooFixed32S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooFixed32S) { return [] }
    return this.Foo.fooFixed32S
  }
  getFooFixed64S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooFixed64S) { return [] }
    return this.Foo.fooFixed64S
  }
  getFooSfixed32S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooSfixed32S) { return [] }
    return this.Foo.fooSfixed32S
  }
  getFooSfixed64S: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooSfixed64S) { return [] }
    return this.Foo.fooSfixed64S
  }
  getFooFloats: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooFloats) { return [] }
    return this.Foo.fooFloats
  }
  getFooDoubles: () => number[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooDoubles) { return [] }
    return this.Foo.fooDoubles
  }
  getFooStrings: () => string[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooStrings) { return [] }
    return this.Foo.fooStrings
  }
  getFooBools: () => boolean[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooBools) { return [] }
    return this.Foo.fooBools
  }
  getFooBytess: () => string[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.fooBytess) { return [] }
    return this.Foo.fooBytess
  }
  getBars: () => Bar[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.bars) { return [] }
    return this.Foo.bars
  }
  getBazs: () => Baz[] = () => {
    if (!this.Foo) { return [] }
    if (!this.Foo.bazs) { return [] }
    return this.Foo.bazs
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
  }
}
export class BazGetter {
  public Baz: Baz | undefined
  constructor(o?: Baz) {
    this.Baz = o
  }
  getBaz: () => string = () => {
    if (!this.Baz) { return "" }
    if (!this.Baz.baz) { return "" }
    return this.Baz.baz
  }
}
