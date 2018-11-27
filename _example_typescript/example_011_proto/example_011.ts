//
// generated file, do not modify
//

import * as example_010_dot_import from "./example_010"

export interface Foo {
  foo?: example_010_dot_import.Foo
  bar?: example_010_dot_import.Foo_Bar
  getFoo: () => example_010_dot_import.Foo
  getBar: () => example_010_dot_import.Foo_Bar
}

export function FooMarshal(t?: Foo): object | undefined {
  if (!t) { return undefined }
  return {
    foo: example_010_dot_import.FooMarshal(t.foo),
    bar: example_010_dot_import.Foo_BarMarshal(t.bar),
  }
}
export function FooUnmarshal(this: any, json: any): Foo | undefined {
  if (!json) { return undefined }
  return {
    foo: example_010_dot_import.FooUnmarshal(json.foo),
    getFoo: () => this.foo ? this.foo : example_010_dot_import.FooUnmarshal({}),
    bar: example_010_dot_import.Foo_BarUnmarshal(json.bar),
    getBar: () => this.bar ? this.bar : example_010_dot_import.Foo_BarUnmarshal({}),
  }
}
