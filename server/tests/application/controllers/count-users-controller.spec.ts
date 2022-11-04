import { describe, expect, it, vi } from 'vitest'
import { CountUsersController } from '@/application/controllers/count-users-controller'
import { CountUsersService } from '@/domain/use-cases/count-users'
import { ok, serverError } from '@/application/helpers/http-helper'
import { throwError } from '../../helper/throw'

interface MakeSut {
  mockCountUsers: CountUsersServiceMock
  sut: CountUsersController
}

class CountUsersServiceMock implements CountUsersService {
  async execute (): Promise<CountUsersService.Output> {
    return { count: 1 }
  }
}

const makeSut = (): MakeSut => {
  const mockCountUsers = new CountUsersServiceMock()
  const sut = new CountUsersController(mockCountUsers)
  return {
    mockCountUsers,
    sut
  }
}

describe('Count Users controller', () => {
  it('should return a count pool', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({})
    expect(res).toEqual(ok({ count: 1 }))
  })
  it('should return server error', async () => {
    const { sut, mockCountUsers } = makeSut()
    vi.spyOn(mockCountUsers, 'execute').mockImplementation((throwError))
    const res = await sut.handle({})
    expect(res).toEqual(serverError(new Error()))
  })
})
