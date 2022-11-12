export interface CreateGuessRepository {
  create: (input: CreateGuessRepository.Input) => Promise<void>
}

export namespace CreateGuessRepository {
  export type Input = {
    participantId: string
    gameId: string
    firstTeamPoints: number
    secondTeamPoints: number
  }
}
