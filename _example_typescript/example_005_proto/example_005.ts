//
// generated file, do not modify
//

// A Haberdasher makes hats for clients.
export interface Haberdasher {
  // MakeHat produces a hat of mysterious, randomly-selected color!
  makeHat: (req: Size) => Promise<Hat>
}

// A Hat is a piece of headwear made by a Haberdasher.
export interface Hat {
  // The size of a hat should always be in inches.
  size?: number

  // The color of a hat will never be 'invisible', but other than
  // that, anything is fair game.
  color?: string

  // The name of a hat is it's type. Like, 'bowler', or something.
  name?: string
  getSize: () => number
  getColor: () => string
  getName: () => string
}

// Size is passed when requesting a new hat to be made. It's always
// measured in inches.
export interface Size {
  inches?: number
  getInches: () => number
}

function windowFetch(url, req) {
  return fetch(url, req)
}

export class HaberdasherClient implements Haberdasher {
  private twirpAddr: string
  private fetch: (url: string, req?: object) => Promise<Response>

  constructor(twirpAddr: string, customFetch?: (url: string, req?: object) => Promise<Response>) {
    this.twirpAddr = twirpAddr
    this.fetch = customFetch ? customFetch : windowFetch
  }

  makeHat(req: Size): Promise<Hat> {
    const url = `${this.twirpAddr}/twirp/twitch.twirp.example.Haberdasher/MakeHat`
    // TODO: shorten this by moving it to a twirp package, reducing generated LOC
    const fetchReq = {
      body: JSON.stringify(SizeMarshal(req)),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json().then((j) => {
      // TODO: use TwirpError type
      if (!res.ok) { throw new Error(j.msg) }
      const v = HatUnmarshal(j)
      if (!v) { throw new Error("makeHat response was undefined") }
      return v
    }))
  }
}

export function HatMarshal(t?: Hat): object | undefined {
  if (!t) { return undefined }
  return {
    size: t.size,
    color: t.color,
    name: t.name,
  }
}
export function HatUnmarshal(this: any, json: any): Hat | undefined {
  if (!json) { return undefined }
  return {
    size: json.size,
    getSize: () => this.size ? this.size : 0,
    color: json.color,
    getColor: () => this.color ? this.color : "",
    name: json.name,
    getName: () => this.name ? this.name : "",
  }
}

export function SizeMarshal(t?: Size): object | undefined {
  if (!t) { return undefined }
  return {
    inches: t.inches,
  }
}
export function SizeUnmarshal(this: any, json: any): Size | undefined {
  if (!json) { return undefined }
  return {
    inches: json.inches,
    getInches: () => this.inches ? this.inches : 0,
  }
}
