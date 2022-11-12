import { Controller } from '@/application/controllers/controller'
import { Authentication } from '@/domain/use-cases/authentication'
import { CreateUser } from '@/domain/use-cases/create-user'
import { HttpResponse } from '@/application/protocols/http'
import { UnauthorizedError } from '@/application/errors/unauthorized-error'
import { badRequest, ok, serverError } from '@/application/helpers/http-helper'
import { ValidationBuilder as Builder } from '@/application/validations/builder'
import { Validator } from '@/application/protocols/validator'

type Request = { accessToken: string }

export class LoginOrCreateUserController extends Controller {
  constructor (
    private readonly createUser: CreateUser,
    private readonly authentication: Authentication
  ) {
    super()
  }

  async perform (request: Request): Promise<HttpResponse> {
    try {
      const userInfo = await this.createUser.execute(request)
      const auth = await this.authentication.auth(userInfo)
      return ok(auth)
    } catch (error) {
      if (error instanceof UnauthorizedError) return badRequest(error)
      return serverError(error)
    }
  }

  override buildValidator (request: any): Validator[] {
    return [
      ...Builder.of({ value: request.accessToken, field: 'accessToken' })
        .required().build()
    ]
  }
}
