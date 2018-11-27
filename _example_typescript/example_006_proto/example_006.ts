//
// generated file, do not modify
//

export interface Foo {
  foo: (req: Bar) => Promise<Bar>
  fooBar: (req: Bar) => Promise<Bar>
}

export interface Bar {
  foo?: string
  barBaz?: string
  getFoo: () => string
  getBarBaz: () => string
}

function windowFetch(url, req) {
  return fetch(url, req)
}

export class FooClient implements Foo {
  private twirpAddr: string
  private fetch: (url: string, req?: object) => Promise<Response>

  constructor(twirpAddr: string, customFetch?: (url: string, req?: object) => Promise<Response>) {
    this.twirpAddr = twirpAddr
    this.fetch = customFetch ? customFetch : windowFetch
  }

  foo(req: Bar): Promise<Bar> {
    const url = `${this.twirpAddr}/twirp/example_006.Foo/Foo`
    // TODO: shorten this by moving it to a twirp package, reducing generated LOC
    const fetchReq = {
      body: JSON.stringify(BarMarshal(req)),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json().then((j) => {
      // TODO: use TwirpError type
      if (!res.ok) { throw new Error(j.msg) }
      return BarUnmarshal(j)
    }))
  }

  fooBar(req: Bar): Promise<Bar> {
    const url = `${this.twirpAddr}/twirp/example_006.Foo/FooBar`
    // TODO: shorten this by moving it to a twirp package, reducing generated LOC
    const fetchReq = {
      body: JSON.stringify(BarMarshal(req)),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json().then((j) => {
      // TODO: use TwirpError type
      if (!res.ok) { throw new Error(j.msg) }
      return BarUnmarshal(j)
    }))
  }
}

export function BarMarshal(t?: Bar): object {
  if (!t) { return null }
  return {
    foo: t.foo,
    bar_baz: t.barBaz,
  }
}
export function BarUnmarshal(json: any): Bar {
  if (!json) { return null }
  return {
    foo: json.foo,
    getFoo: () => this.foo ? this.foo : "",
    barBaz: json.barBaz,
    getBarBaz: () => this.barBaz ? this.barBaz : "",
  }
}
