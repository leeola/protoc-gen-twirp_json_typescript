//
// generated file, do not modify
//

import * as example_001 from "./example_001"
import * as example_003 from "./dir/example_003"

export interface Foo {
  bar001?: example_001.Bar
  foo003?: example_003.Foo
}

export function FooMarshal(t?: Foo): object | undefined {
  if (!t) { return undefined }
  return {
    bar_001: t.bar001,
    foo_003: t.foo003,
  }
}
export function FooUnmarshal(this: any, json: any): Foo | undefined {
  if (!json) { return undefined }
  return {
    bar001: json.bar_001,
    foo003: json.foo_003,
  }
}
export class FooGetter {
  public Foo: Foo | undefined
  constructor(o?: Foo) {
    this.Foo = o
  }
  getBar001: () => example_001.Bar = () => { if (!this.Foo) { return 0 }; return this.Foo.bar001 ? this.Foo.bar001 : 0 }
  getFoo003: () => example_003.Foo = () => { if (!this.Foo) { return 0 }; return this.Foo.foo003 ? this.Foo.foo003 : 0 }
}
