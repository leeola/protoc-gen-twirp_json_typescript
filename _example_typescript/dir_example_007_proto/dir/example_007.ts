//
// generated file, do not modify
//

import * as example_001 from "../example_001"
import * as example_008 from "./dur/example_008"

export interface Foo {
  foo?: string
  bar?: example_001.Bar
  baz?: example_008.Foo
  bang?: example_001.Foo
  getFoo: () => string
  getBar: () => example_001.Bar
  getBaz: () => example_008.Foo
  getBang: () => example_001.Foo
}

export function FooMarshal(t?: Foo): object {
  if (!t) { return null }
  return {
    foo: t.foo,
    bar: t.bar,
    baz: t.baz,
    bang: example_001.FooMarshal(t.bang),
  }
}
export function FooUnmarshal(json: any): Foo {
  if (!json) { return null }
  return {
    foo: json.foo,
    getFoo: () => this.foo ? this.foo : "",
    bar: json.bar,
    getBar: () => this.bar ? this.bar : 0,
    baz: json.baz,
    getBaz: () => this.baz ? this.baz : 0,
    bang: example_001.FooUnmarshal(json.bang),
    getBang: () => this.bang ? this.bang : example_001.FooUnmarshal({}),
  }
}
