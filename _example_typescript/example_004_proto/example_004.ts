//
// generated file, do not modify
//

export interface FooService {
  Foo: (foorequest: FooRequest) => Promise<FooResponse>
}

export interface FooRequest {
  foo: string
}

export interface FooResponse {
  foo: string
}

export class FooServiceImpl implements FooService {
  private twirpAddr: string
  private fetch?: (input: any) => Promise<Response>

  constructor(twirpAddr: string) {
    this.twirpAddr = twirpAddr
  }

  Foo(foorequest: FooRequest): Promise<FooResponse> {
    const url = `${this.twirpAddr}/twirp/example_004.FooService/Foo`
    return fetch(url).then((res) => res.json())
  }
}
