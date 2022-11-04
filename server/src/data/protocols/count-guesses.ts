import { CountGuessesService } from '@/domain/use-cases/count-guesses'

export interface CountGuessesRepository {
  count: () => Promise<CountGuessesRepository.Output>
}

export namespace CountGuessesRepository {
  export type Output = CountGuessesService.Output
}
