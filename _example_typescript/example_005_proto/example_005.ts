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
  size: number

  // The color of a hat will never be 'invisible', but other than
  // that, anything is fair game.
  color: string

  // The name of a hat is it's type. Like, 'bowler', or something.
  name: string
}

// Size is passed when requesting a new hat to be made. It's always
// measured in inches.
export interface Size {
  inches: number
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
    const fetchReq = {
      body: JSON.stringify(SizeToJSON(req)),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json()).then((j) => HatFromJSON(j))
  }
}

export function HatToJSON(t: Hat): object {
  return {
    size: t.size,
    color: t.color,
    name: t.name,
  }
}
export function HatFromJSON(json: any): Hat {
  return {
    size: json.size,
    color: json.color,
    name: json.name,
  }
}

export function SizeToJSON(t: Size): object {
  return {
    inches: t.inches,
  }
}
export function SizeFromJSON(json: any): Size {
  return {
    inches: json.inches,
  }
}
