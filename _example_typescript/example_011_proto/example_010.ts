//
// generated file, do not modify
//

export enum Foo_Baz {
  UNKNOWN = 0,
  BAZ = 1,
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
  public Foo_Bar: Foo_Bar
  constructor(o?: Foo_Bar) {
    this.Foo_Bar = o
  }
  getBar: () => string = () => { if (!this.Foo_Bar) { return "" }; return this.Foo_Bar.bar ? this.Foo_Bar.bar : "" }
}

export function FooMarshal(t?: Foo): object | undefined {
  if (!t) { return undefined }
  return {
    foo: t.foo,
    bar: Foo_BarMarshal(t.bar),
    baz: t.baz,
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
  public Foo: Foo
  constructor(o?: Foo) {
    this.Foo = o
  }
  getFoo: () => string = () => { if (!this.Foo) { return "" }; return this.Foo.foo ? this.Foo.foo : "" }
  getBar: () => Foo_Bar = () => { if (!this.Foo) { return Foo_BarUnmarshal({}) }; return this.Foo.bar ? this.Foo.bar : Foo_BarUnmarshal({}) }
  getBaz: () => Foo_Baz = () => { if (!this.Foo) { return 0 }; return this.Foo.baz ? this.Foo.baz : 0 }
}
