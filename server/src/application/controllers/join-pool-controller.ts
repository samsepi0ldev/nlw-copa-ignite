import { NotFoundError } from '@/application/errors/not-found-error'
import { Controller } from '@/application/controllers/controller'
import { JoinPool } from '@/domain/use-cases/join-pool'
import { HttpResponse } from '@/application/protocols/http'
import { badRequest, created, serverError } from '@/application/helpers/http-helper'
import { Validator } from '@/application/protocols/validator'
import { ValidationBuilder as Builder } from '@/application/validations/builder'

type Request = {
  code: string
  sub: string
}

export class JoinPoolController extends Controller {
  constructor (private readonly joinPool: JoinPool) {
    super()
  }

  async perform ({ code, sub: ownerId }: Request): Promise<HttpResponse> {
    try {
      const isValid = await this.joinPool.execute({ code, ownerId })
      if (isValid) {
        return created()
      }
      return badRequest(new Error('You already has joined this pool'))
    } catch (error) {
      if (error instanceof NotFoundError) {
        return badRequest(error)
      }
      return serverError(error)
    }
  }

  override buildValidator ({ code, sub }: Request): Validator[] {
    return [
      ...Builder.of({ value: code, field: 'code' }).required().build(),
      ...Builder.of({ value: sub, field: 'ownerId' }).required().build()
    ]
  }
}
