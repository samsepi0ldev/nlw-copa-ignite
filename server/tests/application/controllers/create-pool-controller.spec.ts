import { RequiredFieldError } from '@/application/errors/validation'
import { describe, expect, it, vi } from 'vitest'

import { CreatePool } from '@/domain/use-cases/create-pool'
import { CreatePoolController } from '@/application/controllers/create-pool-controller'
import { badRequest, created, serverError } from '@/application/helpers/http-helper'
import { throwError } from '../../helper/throw'

interface MakeSut {
  mockCreatePool: CreatePoolMock
  sut: CreatePoolController
}

class CreatePoolMock implements CreatePool {
  code = '!V5H^'
  async execute (): Promise<CreatePool.Output> {
    return { code: this.code }
  }
}

const makeSut = (): MakeSut => {
  const mockCreatePool = new CreatePoolMock()
  const sut = new CreatePoolController(mockCreatePool)
  return {
    mockCreatePool,
    sut
  }
}

const request = { title: 'any_title' }

describe('Create pool controller', () => {
  it('Should called white correct values', async () => {
    const { sut, mockCreatePool } = makeSut()
    const spy = vi.spyOn(mockCreatePool, 'execute')
    await sut.handle(request)
    expect(spy).toBeCalledWith(request)
  })
  it('should return bad request if not parameter received', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({})
    expect(res).toEqual(badRequest(new RequiredFieldError('title')))
  })
  it('should return server error if to throw', async () => {
    const { sut, mockCreatePool } = makeSut()
    vi.spyOn(mockCreatePool, 'execute').mockImplementationOnce(throwError)
    const res = await sut.handle(request)
    expect(res).toEqual(serverError(Error()))
  })
  it('should return created status if successfully', async () => {
    const { sut, mockCreatePool } = makeSut()
    const res = await sut.handle(request)
    expect(res).toEqual(created({ code: mockCreatePool.code }))
  })
})
