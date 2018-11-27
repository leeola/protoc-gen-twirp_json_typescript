//
// generated file, do not modify
//

export interface FooService {
  foo: (req: FooRequest) => Promise<FooResponse>
}

export interface FooRequest {
  foo?: string
  bar?: Bar
}

export interface FooResponse {
  foo?: string
}

export interface Bar {
  bar?: string
}

function windowFetch(url, req) {
  return fetch(url, req)
}

export class FooServiceClient implements FooService {
  private twirpAddr: string
  private fetch: (url: string, req?: object) => Promise<Response>

  constructor(twirpAddr: string, customFetch?: (url: string, req?: object) => Promise<Response>) {
    this.twirpAddr = twirpAddr
    this.fetch = customFetch ? customFetch : windowFetch
  }

  foo(req: FooRequest): Promise<FooResponse> {
    const url = `${this.twirpAddr}/twirp/example_004.FooService/Foo`
    // TODO: shorten this by moving it to a twirp package, reducing generated LOC
    const fetchReq = {
      body: JSON.stringify(FooRequestMarshal(req)),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json().then((j) => {
      // TODO: use TwirpError type
      if (!res.ok) { throw new Error(j.msg) }
      return FooResponseUnmarshal(j)
    }))
  }
}

export function FooRequestMarshal(t?: FooRequest): object {
  if (!t) { return null }
  return {
    foo: t.foo,
    bar: BarMarshal(t.bar),
  }
}
export function FooRequestUnmarshal(json: any): FooRequest {
  if (!json) { return null }
  return {
    foo: json.foo,
    bar: BarUnmarshal(json.bar),
  }
}

export function FooResponseMarshal(t?: FooResponse): object {
  if (!t) { return null }
  return {
    foo: t.foo,
  }
}
export function FooResponseUnmarshal(json: any): FooResponse {
  if (!json) { return null }
  return {
    foo: json.foo,
  }
}

export function BarMarshal(t?: Bar): object {
  if (!t) { return null }
  return {
    bar: t.bar,
  }
}
export function BarUnmarshal(json: any): Bar {
  if (!json) { return null }
  return {
    bar: json.bar,
  }
}
