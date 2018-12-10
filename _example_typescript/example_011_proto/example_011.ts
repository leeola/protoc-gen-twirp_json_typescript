//
// generated file, do not modify
//

import * as example_010_dot_import from "./example_010"

export interface Foo {
  foo?: example_010_dot_import.Foo
  bar?: example_010_dot_import.Foo_Bar
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
    bar: example_010_dot_import.Foo_BarUnmarshal(json.bar),
  }
}
export class FooGetter {
  public Foo: Foo | undefined
  constructor(o?: Foo) {
    this.Foo = o
  }
  getFoo: () => example_010_dot_import.Foo = () => {
    if (!this.Foo) { const nonZero = example_010_dot_import.FooUnmarshal({}); if (!nonZero) { throw new Error("nonzero returned zero value") }; return nonZero }
    if (!this.Foo.foo) { const nonZero = example_010_dot_import.FooUnmarshal({}); if (!nonZero) { throw new Error("nonzero returned zero value") }; return nonZero }
    return this.Foo.foo
  }
  getBar: () => example_010_dot_import.Foo_Bar = () => {
    if (!this.Foo) { const nonZero = example_010_dot_import.Foo_BarUnmarshal({}); if (!nonZero) { throw new Error("nonzero returned zero value") }; return nonZero }
    if (!this.Foo.bar) { const nonZero = example_010_dot_import.Foo_BarUnmarshal({}); if (!nonZero) { throw new Error("nonzero returned zero value") }; return nonZero }
    return this.Foo.bar
  }
}
