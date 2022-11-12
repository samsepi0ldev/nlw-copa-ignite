import { NotFoundError } from '@/application/errors/not-found-error'
import { ForbiddenError } from '@/application/errors/forbidden-error'
import { badRequest, created, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/controllers/controller'
import { HttpResponse } from '@/application/protocols/http'
import { ValidationBuilder as Builder } from '@/application/validations/builder'
import { Validator } from '@/application/protocols/validator'
import { CreateGuess } from '@/domain/use-cases/create-guess'

interface Request {
  sub: string
  poolId: string
  gameId: string
  firstTeamPoints: number
  secondTeamPoints: number
}

export class CreateGuessesController extends Controller {
  constructor (private readonly createGuess: CreateGuess) {
    super()
  }

  async perform (request: Request): Promise<HttpResponse> {
    try {
      const guessResponse = await this.createGuess.execute({
        userId: request.sub,
        gameId: request.gameId,
        poolId: request.poolId,
        firstTeamPoints: request.firstTeamPoints,
        secondTeamPoints: request.secondTeamPoints
      })
      if (guessResponse instanceof ForbiddenError) {
        return badRequest(guessResponse)
      }
      return created()
    } catch (error) {
      if (error instanceof NotFoundError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }

  override buildValidator ({ firstTeamPoints, secondTeamPoints, gameId, poolId, sub }: Request): Validator[] {
    return [
      ...Builder.of({ value: firstTeamPoints, field: 'firstTeamPoints' }).required().build(),
      ...Builder.of({ value: secondTeamPoints, field: 'secondTeamPoints' }).required().build(),
      ...Builder.of({ value: gameId, field: 'gameId' }).required().build(),
      ...Builder.of({ value: poolId, field: 'poolId' }).required().build(),
      ...Builder.of({ value: sub, field: 'userId' }).required().build()
    ]
  }
}
