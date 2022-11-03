import { CountGuessesService } from '@/domain/use-cases/count-guesses'
import { CountGuessesRepository } from '@/data/protocols/count-guesses'

export class DbCountGuessesService implements CountGuessesService {
  constructor (private readonly countGuessesRepository: CountGuessesRepository) {}

  async execute (): Promise<CountGuessesService.Output> {
    return await this.countGuessesRepository.count()
  }
}
