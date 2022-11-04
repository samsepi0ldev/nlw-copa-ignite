import { DbCountGuessesService } from '@/data/use-cases/count-guesses'
import { CountGuessesService } from '@/domain/use-cases/count-guesses'
import { PrismaGuessesRepository } from '@/infra/guesses-repository'

export const makeCountGuessesService = (): CountGuessesService => {
  const repo = new PrismaGuessesRepository()
  return new DbCountGuessesService(repo)
}
