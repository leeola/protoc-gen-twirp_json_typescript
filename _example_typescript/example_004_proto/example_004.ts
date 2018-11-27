//
// generated file, do not modify
//

export interface FooService {
  foo: (req: FooRequest) => Promise<FooResponse>
}

export interface FooRequest {
  foo: string
  bar: Bar
}

export interface FooResponse {
  foo: string
}

export interface Bar {
  bar: string
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
      body: JSON.stringify(FooRequestToJSON(req)),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json().then((j) => {
      // TODO: use TwirpError type
      if (!res.ok) { throw new Error(j.msg) }
      return FooResponseFromJSON(j)
    }))
  }
}

export function FooRequestToJSON(t: FooRequest): object {
  return {
    foo: t.foo,
    bar: t.bar ? BarToJSON(t.bar) : undefined,
  }
}
export function FooRequestFromJSON(json: any): FooRequest {
  return {
    foo: json.foo,
    bar: BarFromJSON(json.bar),
  }
}

export function FooResponseToJSON(t: FooResponse): object {
  return {
    foo: t.foo,
  }
}
export function FooResponseFromJSON(json: any): FooResponse {
  return {
    foo: json.foo,
  }
}

export function BarToJSON(t: Bar): object {
  return {
    bar: t.bar,
  }
}
export function BarFromJSON(json: any): Bar {
  return {
    bar: json.bar,
  }
}
