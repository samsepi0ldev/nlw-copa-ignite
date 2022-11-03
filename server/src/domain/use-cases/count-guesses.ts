export interface CountGuessesService {
  execute: () => Promise<CountGuessesService.Output>
}

export namespace CountGuessesService {
  export type Output = { count: number }
}
