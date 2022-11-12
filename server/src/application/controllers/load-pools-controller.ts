import { noContent, ok } from '@/application/helpers/http-helper'
import { Controller } from '@/application/controllers/controller'
import { HttpResponse } from '@/application/protocols/http'
import { ValidationBuilder as Builder } from '@/application/validations/builder'
import { Validator } from '@/application/protocols/validator'
import { LoadPools } from '@/domain/use-cases/load-pools'

interface Request {
  sub: string
}

export class LoadPoolsController extends Controller {
  constructor (private readonly loadPools: LoadPools) {
    super()
  }

  async perform (request: Request): Promise<HttpResponse> {
    const polls = await this.loadPools.execute({ userId: request.sub })
    return polls.length > 0 ? ok(polls) : noContent()
  }

  override buildValidator ({ sub }: Request): Validator[] {
    return [
      ...Builder.of({ value: sub, field: 'ownerId' }).required().build()
    ]
  }
}
