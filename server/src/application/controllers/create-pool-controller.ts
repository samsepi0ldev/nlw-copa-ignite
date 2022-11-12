import { Controller } from '@/application/controllers/controller'
import { HttpResponse } from '@/application/protocols/http'
import { Validator } from '@/application/protocols/validator'
import { CreatePool } from '@/domain/use-cases/create-pool'
import { ValidationBuilder as Builder } from '@/application/validations/builder'
import { created, serverError } from '@/application/helpers/http-helper'

type Request = {
  title: string
  sub?: string
}

export class CreatePoolController extends Controller {
  constructor (private readonly createPool: CreatePool) {
    super()
  }

  async perform ({ title, sub: ownerId }: Request): Promise<HttpResponse<{ code: string } | Error>> {
    try {
      const poolCode = await this.createPool.execute({
        title,
        ownerId
      })
      return created(poolCode)
    } catch (error) {
      return serverError(error)
    }
  }

  override buildValidator (request: Request): Validator[] {
    return [
      ...Builder.of({ value: request.title, field: 'title' }).required().build()
    ]
  }
}
