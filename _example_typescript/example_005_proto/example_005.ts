//
// generated file, do not modify
//

// A Haberdasher makes hats for clients.
export interface Haberdasher {
  MakeHat: (req: Size) => Promise<Hat>
}

// A Hat is a piece of headwear made by a Haberdasher.
export interface Hat {
  size: number
  color: string
  name: string
}

// Size is passed when requesting a new hat to be made. It's always
// measured in inches.
export interface Size {
  inches: number
}

export class HaberdasherImpl implements Haberdasher {
  private twirpAddr: string
  private fetch: (url: string, req?: object) => Promise<Response>

  constructor(twirpAddr: string, customFetch?: (url: string, req?: object) => Promise<Response>) {
    this.twirpAddr = twirpAddr
    this.fetch = customFetch ? customFetch : fetch
  }

  MakeHat(req: Size): Promise<Hat> {
    const url = `${this.twirpAddr}/twirp/twitch.twirp.example.Haberdasher/MakeHat`
    const fetchReq = {
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }
    return this.fetch(url, fetchReq).then((res) => res.json())
  }
}
