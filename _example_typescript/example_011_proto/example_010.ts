//
// generated file, do not modify
//

export enum Foo_Baz {
  UNKNOWN = "UNKNOWN",
  BAZ = "BAZ",
}

export function Foo_BazMap(n: number): Foo_Baz {
  switch(n) {
  case 0:
    return Foo_Baz.UNKNOWN
  case 1:
    return Foo_Baz.BAZ
  default:
    return Foo_Baz.UNKNOWN
  }
}

export function Foo_BazMarshal(e?: Foo_Baz): number | undefined {
  if (!e) { return undefined }
  switch(e) {
  case Foo_Baz.UNKNOWN:
    return 0
  case Foo_Baz.BAZ:
    return 1
  default:
    return 0
  }
}

export interface Foo_Bar {
  bar?: string
}

export interface Foo {
  foo?: string

  // field type of embedded type.
  bar?: Foo_Bar
  baz?: Foo_Baz
}

export function Foo_BarMarshal(t?: Foo_Bar): object | undefined {
  if (!t) { return undefined }
  return {
    bar: t.bar,
  }
}
export function Foo_BarUnmarshal(this: any, json: any): Foo_Bar | undefined {
  if (!json) { return undefined }
  return {
    bar: json.bar,
  }
}
export class Foo_BarGetter {
  public Foo_Bar: Foo_Bar | undefined
  constructor(o?: Foo_Bar) {
    this.Foo_Bar = o
  }
  getBar: () => string = () => {
    if (!this.Foo_Bar) { return "" }
    if (!this.Foo_Bar.bar) { return "" }
    return this.Foo_Bar.bar
  }
}

export function FooMarshal(t?: Foo): object | undefined {
  if (!t) { return undefined }
  return {
    foo: t.foo,
    bar: Foo_BarMarshal(t.bar),
    baz: t.baz ? Foo_BazMarshal(t.baz) : undefined,
  }
}
export function FooUnmarshal(this: any, json: any): Foo | undefined {
  if (!json) { return undefined }
  return {
    foo: json.foo,
    bar: Foo_BarUnmarshal(json.bar),
    baz: json.baz,
  }
}
export class FooGetter {
  public Foo: Foo | undefined
  constructor(o?: Foo) {
    this.Foo = o
  }
  getFoo: () => string = () => {
    if (!this.Foo) { return "" }
    if (!this.Foo.foo) { return "" }
    return this.Foo.foo
  }
  getBar: () => Foo_Bar = () => {
    if (!this.Foo) { const nonZero = Foo_BarUnmarshal({}); if (!nonZero) { throw new Error("nonzero returned zero value") }; return nonZero }
    if (!this.Foo.bar) { const nonZero = Foo_BarUnmarshal({}); if (!nonZero) { throw new Error("nonzero returned zero value") }; return nonZero }
    return this.Foo.bar
  }
  getBaz: () => Foo_Baz = () => {
    if (!this.Foo) { return Foo_BazMap(0) }
    if (!this.Foo.baz) { return Foo_BazMap(0) }
    return this.Foo.baz
  }
}
