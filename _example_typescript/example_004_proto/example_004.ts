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
      const v = FooResponseUnmarshal(j)
      if (!v) { throw new Error("foo response was undefined") }
      return v
    }))
  }
}

export function FooRequestMarshal(t?: FooRequest): object | undefined {
  if (!t) { return undefined }
  return {
    foo: t.foo,
    bar: BarMarshal(t.bar),
  }
}
export function FooRequestUnmarshal(this: any, json: any): FooRequest | undefined {
  if (!json) { return undefined }
  return {
    foo: json.foo,
    bar: BarUnmarshal(json.bar),
  }
}
export class FooRequestGetter {
  public FooRequest: FooRequest
  constructor(o: FooRequest) {
    this.FooRequest = o
  }
  getFoo = () => this.FooRequest.foo ? this.FooRequest.foo : ""
  getBar = () => this.FooRequest.bar ? this.FooRequest.bar : BarUnmarshal({})
}

export function FooResponseMarshal(t?: FooResponse): object | undefined {
  if (!t) { return undefined }
  return {
    foo: t.foo,
  }
}
export function FooResponseUnmarshal(this: any, json: any): FooResponse | undefined {
  if (!json) { return undefined }
  return {
    foo: json.foo,
  }
}
export class FooResponseGetter {
  public FooResponse: FooResponse
  constructor(o: FooResponse) {
    this.FooResponse = o
  }
  getFoo = () => this.FooResponse.foo ? this.FooResponse.foo : ""
}

export function BarMarshal(t?: Bar): object | undefined {
  if (!t) { return undefined }
  return {
    bar: t.bar,
  }
}
export function BarUnmarshal(this: any, json: any): Bar | undefined {
  if (!json) { return undefined }
  return {
    bar: json.bar,
  }
}
export class BarGetter {
  public Bar: Bar
  constructor(o: Bar) {
    this.Bar = o
  }
  getBar = () => this.Bar.bar ? this.Bar.bar : ""
}
