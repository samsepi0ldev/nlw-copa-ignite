import { Controller } from '@/application/controllers/controller'
import { CountGuessesService } from '@/domain/use-cases/count-guesses'
import { HttpResponse } from '@/application/protocols/http'
import { ok } from '@/application/helpers/http-helper'

export class CountGuessesController extends Controller {
  constructor (private readonly countGuessesService: CountGuessesService) {
    super()
  }

  async perform (): Promise<HttpResponse> {
    const countGuesses = await this.countGuessesService.execute()
    return ok(countGuesses)
  }
}
