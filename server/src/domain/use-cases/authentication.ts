export interface Authentication {
  auth: (input: Authentication.Input) => Promise<Authentication.Output>
}

export namespace Authentication {
  export type Input = {
    id: string
    name: string
    avatar: string | null
  }
  export type Output = {
    token: string
  }
}
