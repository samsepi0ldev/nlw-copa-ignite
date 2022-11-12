export interface CreateParticipantRepository {
  create: (input: CreateParticipantRepository.Input) => Promise<boolean>
}

export namespace CreateParticipantRepository {
  export type Input = {
    poolId: string
    userId: string
  }
}
