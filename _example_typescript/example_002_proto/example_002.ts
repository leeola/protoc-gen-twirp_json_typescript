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
    bar001: Number(example_001.Bar[json.bar_001]),
    foo003: Number(example_003.Foo[json.foo_003]),
  }
}
export class FooGetter {
  public Foo: Foo | undefined
  constructor(o?: Foo) {
    this.Foo = o
  }
  getBar001: () => example_001.Bar = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.bar001) { return 0 }
    return this.Foo.bar001
  }
  getFoo003: () => example_003.Foo = () => {
    if (!this.Foo) { return 0 }
    if (!this.Foo.foo003) { return 0 }
    return this.Foo.foo003
  }
}
