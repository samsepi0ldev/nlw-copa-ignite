import { Controller } from '@/application/controllers/controller'
import { CountPoolsService } from '@/domain/use-cases/count-pools'
import { HttpResponse } from '@/application/protocols/http'
import { ok } from '@/application/helpers/http-helper'

export class CountPoolsController extends Controller {
  constructor (private readonly countPoolsService: CountPoolsService) {
    super()
  }

  async perform (): Promise<HttpResponse> {
    const countPools = await this.countPoolsService.execute()
    return ok(countPools)
  }
}
