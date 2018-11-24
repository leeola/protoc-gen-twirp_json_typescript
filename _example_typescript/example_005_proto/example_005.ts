//
// generated file, do not modify
//

export interface Haberdasher {
  MakeHat: (req: Size) => Promise<Hat>
}

export interface Hat {
  size: number
  color: string
  name: string
}

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