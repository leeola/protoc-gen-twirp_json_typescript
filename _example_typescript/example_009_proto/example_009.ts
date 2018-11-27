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

export function Foo_BarMarshal(t?: Foo_Bar): object {
  if (!t) { return null }
  return {
    bar: t.bar,
  }
}
export function Foo_BarUnmarshal(json: any): Foo_Bar {
  if (!json) { return null }
  return {
    bar: json.bar,
  }
}

export function FooMarshal(t?: Foo): object {
  if (!t) { return null }
  return {
    foo: t.foo,
    bar: Foo_BarMarshal(t.bar),
    baz: t.baz,
  }
}
export function FooUnmarshal(json: any): Foo {
  if (!json) { return null }
  return {
    foo: json.foo,
    bar: Foo_BarUnmarshal(json.bar),
    baz: json.baz,
  }
}
