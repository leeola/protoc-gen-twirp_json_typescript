//
// generated file, do not modify
//

import * as example_010_dot_import from "./example_010"

export interface Foo {
  foo: example_010_dot_import.Foo
  bar: example_010_dot_import.Foo_Bar
}

export function FooToJSON(t: Foo): object {
  return {
    foo: example_010_dot_import.FooToJSON(t.foo),
    bar: example_010_dot_import.Foo_BarToJSON(t.bar),
  }
}
export function FooFromJSON(json: any): Foo {
  return {
    foo: example_010_dot_import.FooFromJSON(json.foo),
    bar: example_010_dot_import.Foo_BarFromJSON(json.bar),
  }
}
