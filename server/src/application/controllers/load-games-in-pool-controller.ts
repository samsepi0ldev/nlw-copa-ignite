import { ok, noContent } from '@/application/helpers/http-helper'
import { Controller } from '@/application/controllers/controller'
import { HttpResponse } from '@/application/protocols/http'
import { LoadGamesInPool } from '@/domain/use-cases/load-games-in-pool'
import { Validator } from '@/application/protocols/validator'
import { ValidationBuilder as Builder } from '@/application/validations/builder'

interface Request {
  sub: string
  id: string
}

export class LoadGamesInPoolController extends Controller {
  constructor (private readonly loadGamesInPool: LoadGamesInPool) {
    super()
  }

  async perform ({ sub, id }: Request): Promise<HttpResponse> {
    const games = await this.loadGamesInPool.execute({
      poolId: id,
      userId: sub
    })
    return games.length > 0 ? ok(games) : noContent()
  }

  override buildValidator ({ sub }: Request): Validator[] {
    return [
      ...Builder.of({ value: sub, field: 'id' }).required().build()
    ]
  }
}
