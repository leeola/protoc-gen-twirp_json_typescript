//
// generated file, do not modify
//

export enum Foo {
  UNKOWN = "UNKOWN",
  FOO = "FOO",
}

export function FooMap(n: number): Foo {
  switch(n) {
  case 0:
    return Foo.UNKOWN
  case 1:
    return Foo.FOO
  default:
    return Foo.UNKOWN
  }
}

export function FooMarshal(e?: Foo): number | undefined {
  if (!e) { return undefined }
  switch(e) {
  case Foo.UNKOWN:
    return 0
  case Foo.FOO:
    return 1
  default:
    return 0
  }
}
