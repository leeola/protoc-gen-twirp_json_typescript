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
}

export function FooMarshal(t?: Foo): object | undefined {
  if (!t) { return undefined }
  return {
    foo: t.foo,
    bar: t.bar,
    baz: t.baz,
    bang: example_001.FooMarshal(t.bang),
  }
}
export function FooUnmarshal(this: any, json: any): Foo | undefined {
  if (!json) { return undefined }
  return {
    foo: json.foo,
    bar: json.bar,
    baz: json.baz,
    bang: example_001.FooUnmarshal(json.bang),
  }
}
export class FooGetter {
  public Foo: Foo | undefined
  constructor(o?: Foo) {
    this.Foo = o
  }
  getFoo: () => string = () => { if (!this.Foo) { return "" }; return this.Foo.foo ? this.Foo.foo : "" }
  getBar: () => example_001.Bar = () => { if (!this.Foo) { return 0 }; return this.Foo.bar ? this.Foo.bar : 0 }
  getBaz: () => example_008.Foo = () => { if (!this.Foo) { return 0 }; return this.Foo.baz ? this.Foo.baz : 0 }
  getBang: () => example_001.Foo = () => { if (!this.Foo) { return example_001.FooUnmarshal({}) }; return this.Foo.bang ? this.Foo.bang : example_001.FooUnmarshal({}) }
}
