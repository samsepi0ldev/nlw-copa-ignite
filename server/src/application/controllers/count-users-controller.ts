import { Controller } from '@/application/controllers/controller'
import { CountUsersService } from '@/domain/use-cases/count-users'
import { HttpResponse } from '@/application/protocols/http'
import { ok } from '@/application/helpers/http-helper'

export class CountUsersController extends Controller {
  constructor (private readonly countUsersService: CountUsersService) {
    super()
  }

  async perform (): Promise<HttpResponse> {
    const countUsers = await this.countUsersService.execute()
    return ok(countUsers)
  }
}
