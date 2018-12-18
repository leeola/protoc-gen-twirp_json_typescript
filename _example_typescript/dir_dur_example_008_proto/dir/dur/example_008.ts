//
// generated file, do not modify
//

export enum Foo {
  UNKNOWN = "UNKNOWN",
  FOO = "FOO",
}

export function FooMap(n: number): Foo {
  switch(n) {
  case 0:
    return Foo.UNKNOWN
  case 1:
    return Foo.FOO
  default:
    return Foo.UNKNOWN
  }
}

export function FooMarshal(e?: Foo): number | undefined {
  if (!e) { return undefined }
  switch(e) {
  case Foo.UNKNOWN:
    return 0
  case Foo.FOO:
    return 1
  default:
    return 0
  }
}
