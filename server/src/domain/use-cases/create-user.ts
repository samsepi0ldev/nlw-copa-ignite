export interface CreateUser {
  execute: (input: CreateUser.Input) => Promise<CreateUser.Output>
}

export namespace CreateUser {
  export type Input = {
    accessToken: string
  }
  export type Output = {
    id: string
    name: string
    avatar: string | null
  }
}
