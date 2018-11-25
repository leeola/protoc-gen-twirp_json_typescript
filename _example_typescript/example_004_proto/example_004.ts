//
// generated file, do not modify
//

export interface FooService {
  foo: (req: FooRequest) => Promise<FooResponse>
}

export interface FooRequest {
  foo: string
}

export interface FooResponse {
  foo: string
}

export class FooServiceImpl implements FooService {
  private twirpAddr: string
  private fetch: (url: string, req?: object) => Promise<Response>

  constructor(twirpAddr: string, customFetch?: (url: string, req?: object) => Promise<Response>) {
    this.twirpAddr = twirpAddr
    this.fetch = customFetch ? customFetch : fetch
  }

  foo(req: FooRequest): Promise<FooResponse> {
    const url = `${this.twirpAddr}/twirp/example_004.FooService/foo`
    const fetchReq = {
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json())
  }
}
