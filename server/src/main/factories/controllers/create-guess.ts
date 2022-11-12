import { Controller } from '@/application/controllers/controller'
import { CreateGuessesController } from '@/application/controllers/create-guesses-controller'
import { makeDbCreateGuess } from '@/main/factories/use-cases/create-guess'

export const makeCreateGuessController = (): Controller => {
  return new CreateGuessesController(makeDbCreateGuess())
}
