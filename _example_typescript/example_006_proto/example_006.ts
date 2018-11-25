//
// generated file, do not modify
//

export interface Foo {
  foo: (req: Bar) => Promise<Bar>
  fooBar: (req: Bar) => Promise<Bar>
}

export interface Bar {
  foo: string
  barBaz: string
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
    const fetchReq = {
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json())
  }

  fooBar(req: Bar): Promise<Bar> {
    const url = `${this.twirpAddr}/twirp/example_006.Foo/FooBar`
    const fetchReq = {
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json())
  }
}
