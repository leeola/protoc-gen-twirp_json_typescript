//
// generated file, do not modify
//

export enum Foo_Baz {
  UNKNOWN = 0,
  BAZ = 1,
}

export interface Foo_Bar {
  bar?: string
  getBar: () => string
}

export interface Foo {
  foo?: string

  // field type of embedded type.
  bar?: Foo_Bar
  baz?: Foo_Baz
  getFoo: () => string
  getBar: () => Foo_Bar
  getBaz: () => Foo_Baz
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
    getBar: () => this.bar ? this.bar : "",
  }
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
    getFoo: () => this.foo ? this.foo : "",
    bar: Foo_BarUnmarshal(json.bar),
    getBar: () => this.bar ? this.bar : Foo_BarUnmarshal({}),
    baz: json.baz,
    getBaz: () => this.baz ? this.baz : 0,
  }
}
