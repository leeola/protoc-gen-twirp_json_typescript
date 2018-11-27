//
// generated file, do not modify
//

import * as example_001 from "../example_001"
import * as example_008 from "./dur/example_008"

export interface Foo {
  foo: string
  bar: example_001.Bar
  baz: example_008.Foo
  bang: example_001.Foo
}

export function FooToJSON(t: Foo): object {
  return {
    foo: t.foo,
    bar: t.bar,
    baz: t.baz,
    bang: t.bang ? example_001.FooToJSON(t.bang) : undefined,
  }
}
export function FooFromJSON(json: any): Foo {
  return {
    foo: json.foo,
    bar: json.bar,
    baz: json.baz,
    bang: example_001.FooFromJSON(json.bang),
  }
}
