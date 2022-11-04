import { Controller } from '@/application/controllers/controller'
import { CountGuessesController } from '@/application/controllers/count-guesses-controller'
import { makeCountGuessesService } from '@/main/factories/use-cases/count-guesses'

export const makeCountGuessesController = (): Controller => {
  return new CountGuessesController(makeCountGuessesService())
}
