import { noContent, ok } from '@/application/helpers/http-helper'
import { Controller } from '@/application/controllers/controller'
import { HttpResponse } from '@/application/protocols/http'
import { ValidationBuilder as Builder } from '@/application/validations/builder'
import { Validator } from '@/application/protocols/validator'
import { LoadPool } from '@/domain/use-cases/load-pool'

interface Request {
  id: string
}

export class LoadPoolController extends Controller {
  constructor (private readonly loadPool: LoadPool) {
    super()
  }

  async perform ({ id }: Request): Promise<HttpResponse> {
    const poll = await this.loadPool.execute({ id })
    return poll !== null ? ok(poll) : noContent()
  }

  override buildValidator ({ id }: Request): Validator[] {
    return [
      ...Builder.of({ value: id, field: 'id' }).required().build()
    ]
  }
}
