//
// generated file, do not modify
//

export enum Foo_Baz {
  UNKNOWN = 0,
  BAZ = 1,
}

export interface Foo_Bar {
  bar: string
}

export interface Foo {
  foo: string

  // field type of embedded type.
  bar: Foo_Bar
  baz: Foo_Baz
}

export function Foo_BarToJSON(t: Foo_Bar): object {
  return {
    bar: t.bar,
  }
}
export function Foo_BarFromJSON(json: any): Foo_Bar {
  return {
    bar: json.bar,
  }
}

export function FooToJSON(t: Foo): object {
  return {
    foo: t.foo,
    bar: Foo_BarToJSON(t.bar),
    baz: t.baz,
  }
}
export function FooFromJSON(json: any): Foo {
  return {
    foo: json.foo,
    bar: Foo_BarFromJSON(json.bar),
    baz: json.baz,
  }
}
