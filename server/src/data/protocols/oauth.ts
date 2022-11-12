export interface OAuthServiceGoogle {
  getUser: (input: OAuthServiceGoogle.Input) => Promise<OAuthServiceGoogle.Output>
}

export namespace OAuthServiceGoogle {
  export type Input = {
    accessToken: string
  }
  export type Output = {
    id: string
    name: string
    email: string
    picture: string
  } | undefined
}
