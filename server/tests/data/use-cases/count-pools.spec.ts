import { describe, expect, it, vi } from 'vitest'

import { throwError } from '../../helper/throw'
import { DbCountPoolsService } from '@/data/use-cases/count-pools'
import { CountPoolsRepository } from '@/data/protocols/count-pools'

interface MakeSut {
  mockCountPoolRepository: CountPoolMockRepository
  sut: DbCountPoolsService
}

class CountPoolMockRepository implements CountPoolsRepository {
  value = { count: 10 }
  async count (): Promise<CountPoolsRepository.Output> {
    return this.value
  }
}

const makeSut = (): MakeSut => {
  const mockCountPoolRepository = new CountPoolMockRepository()
  const sut = new DbCountPoolsService(mockCountPoolRepository)
  return {
    mockCountPoolRepository,
    sut
  }
}

describe('DbCountPools', () => {
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
