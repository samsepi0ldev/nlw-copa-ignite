export interface FindParticipantByPoolAndUserRepository {
  findByPoolAndUser: (input: FindParticipantByPoolAndUserRepository.Input) => Promise<FindParticipantByPoolAndUserRepository.Output>
}

export namespace FindParticipantByPoolAndUserRepository {
  export type Input = {
    poolId: string
    userId: string
  }
  export type Output = {
    id: string
    userId: string
    poolId: string
  } | null
}
