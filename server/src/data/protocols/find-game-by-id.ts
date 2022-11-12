export interface FindGameByIdRepository {
  findById: (input: FindGameByIdRepository.Input) => Promise<FindGameByIdRepository.Output>
}

export namespace FindGameByIdRepository {
  export type Input = {
    id: string
  }
  export type Output = {
    id: string
    date: Date
    firstTeamCountyCode: string
    secondTeamCountyCode: string
  } | null
}
