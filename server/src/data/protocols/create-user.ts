export interface CreateUserRepository {
  create: (input: CreateUserRepository.Input) => Promise<CreateUserRepository.Output>
}

export namespace CreateUserRepository {
  export type Input = {
    name: string
    email: string
    avatar: string
    googleId: string
  }
  export type Output = {
    id: string
    name: string
    email: string
    avatar: string | null
    googleId: string | null
  }
}
