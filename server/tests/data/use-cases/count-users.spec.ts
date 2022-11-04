import { describe, expect, it, vi } from 'vitest'

import { throwError } from '../../helper/throw'
import { DbCountUsersService } from '@/data/use-cases/count-users'
import { CountUsersRepository } from '@/data/protocols/count-users'

interface MakeSut {
  mockCountPoolRepository: CountPoolMockRepository
  sut: DbCountUsersService
}

class CountPoolMockRepository implements CountUsersRepository {
  value = { count: 10 }
  async count (): Promise<CountUsersRepository.Output> {
    return this.value
  }
}

const makeSut = (): MakeSut => {
  const mockCountPoolRepository = new CountPoolMockRepository()
  const sut = new DbCountUsersService(mockCountPoolRepository)
  return {
    mockCountPoolRepository,
    sut
  }
}

describe('DbCountUsers', () => {
  it('Should return a object count', async () => {
    const { sut, mockCountPoolRepository } = makeSut()
    const res = await sut.execute()
    expect(res).toBe(mockCountPoolRepository.value)
  })
  it('Should throw if CountPoolRepository throws', async () => {
    const { sut, mockCountPoolRepository } = makeSut()
    vi.spyOn(mockCountPoolRepository, 'count').mockImplementationOnce(throwError)
    const res = sut.execute()
    await expect(res).rejects.toThrow()
  })
})
