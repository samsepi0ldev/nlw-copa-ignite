export interface FindGuessByParticipantAndGameRepository {
  findByParticipantAndGame: (input: FindGuessByParticipantAndGameRepository.Input) => Promise<FindGuessByParticipantAndGameRepository.Output>
}

export namespace FindGuessByParticipantAndGameRepository {
  export type Input = {
    participantId: string
    gameId: string
  }
  export type Output = {
    id: string
    firstTeamPoints: number
    secondTeamPoints: number
    createdAt: Date
    gameId: string
    participantId: string
  } | null
}
