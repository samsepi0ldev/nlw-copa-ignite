import { Validator } from '@/application/protocols/validator'
import { badRequest, serverError } from '@/application/helpers/http-helper'
import { HttpResponse } from '@/application/protocols/http'
import { ValidationComposite } from '@/application/validations/composite'

type Request = any

export abstract class Controller {
  abstract perform (request: Request): Promise<HttpResponse>

  buildValidator (request: Request): Validator[] {
    return []
  }

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validate(request)
      if (error !== undefined) {
        return badRequest(error)
      }
      return await this.perform(request)
    } catch (error) {
      return serverError(error)
    }
  }

  private validate (request: Request): Error | undefined {
    const validators = this.buildValidator(request)
    return new ValidationComposite(validators).validate()
  }
}
