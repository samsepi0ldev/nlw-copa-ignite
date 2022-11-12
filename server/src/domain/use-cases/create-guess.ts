export interface CreateGuess {
  execute: (input: CreateGuess.Input) => Promise<undefined | Error>
}

export namespace CreateGuess {
  export type Input = {
    userId: string
    poolId: string
    gameId: string
    firstTeamPoints: number
    secondTeamPoints: number
  }
}
