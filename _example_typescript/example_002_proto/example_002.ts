//
// generated file, do not modify
//

import * as example_001 from "./example_001"
import * as example_003 from "./dir/example_003"

export interface Foo {
  bar001?: example_001.Bar
  foo003?: example_003.Foo
  getBar001: () => example_001.Bar
  getFoo003: () => example_003.Foo
}

export function FooMarshal(t?: Foo): object {
  if (!t) { return null }
  return {
    bar_001: t.bar001,
    foo_003: t.foo003,
  }
}
export function FooUnmarshal(json: any): Foo {
  if (!json) { return null }
  return {
    bar001: json.bar001,
    getBar001: () => this.bar001 ? this.bar001 : 0,
    foo003: json.foo003,
    getFoo003: () => this.foo003 ? this.foo003 : 0,
  }
}
