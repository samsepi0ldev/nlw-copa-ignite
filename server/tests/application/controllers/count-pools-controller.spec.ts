import { describe, expect, it, vi } from 'vitest'
import { CountPoolsController } from '@/application/controllers/count-pools-controller'
import { CountPoolsService } from '@/domain/use-cases/count-pools'
import { ok, serverError } from '@/application/helpers/http-helper'
import { throwError } from '../../helper/throw'

interface MakeSut {
  mockCountPools: CountPoolsServiceMock
  sut: CountPoolsController
}

class CountPoolsServiceMock implements CountPoolsService {
  async execute (): Promise<CountPoolsService.Output> {
    return { count: 1 }
  }
}

const makeSut = (): MakeSut => {
  const mockCountPools = new CountPoolsServiceMock()
  const sut = new CountPoolsController(mockCountPools)
  return {
    mockCountPools,
    sut
  }
}

describe('Count pools controller', () => {
  it('should return a count pool', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({})
    expect(res).toEqual(ok({ count: 1 }))
  })
  it('should return server error', async () => {
    const { sut, mockCountPools } = makeSut()
    vi.spyOn(mockCountPools, 'execute').mockImplementation((throwError))
    const res = await sut.handle({})
    expect(res).toEqual(serverError(new Error()))
  })
})
