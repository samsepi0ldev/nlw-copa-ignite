export interface LoadUserByGoogleIdRepository {
  loadByGoogleId: (input: LoadUserByGoogleIdRepository.Input) => Promise<LoadUserByGoogleIdRepository.Output>
}

export namespace LoadUserByGoogleIdRepository {
  export type Input = {
    googleId: string
  }
  export type Output = {
    id: string
    name: string
    email: string
    avatar: string | null
    googleId: string | null
  } | null
}
