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
}

// Size is passed when requesting a new hat to be made. It's always
// measured in inches.
export interface Size {
  inches?: number
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
    color: json.color,
    name: json.name,
  }
}
export class HatGetter {
  public Hat: Hat | undefined
  constructor(o?: Hat) {
    this.Hat = o
  }
  getSize: () => number = () => { if (!this.Hat) { return 0 }; return this.Hat.size ? this.Hat.size : 0 }
  getColor: () => string = () => { if (!this.Hat) { return "" }; return this.Hat.color ? this.Hat.color : "" }
  getName: () => string = () => { if (!this.Hat) { return "" }; return this.Hat.name ? this.Hat.name : "" }
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
  }
}
export class SizeGetter {
  public Size: Size | undefined
  constructor(o?: Size) {
    this.Size = o
  }
  getInches: () => number = () => { if (!this.Size) { return 0 }; return this.Size.inches ? this.Size.inches : 0 }
}
