import { describe, expect, it, vi } from 'vitest'

import { throwError } from '../../helper/throw'
import { DbCreatePool } from '@/data/use-cases/create-pool'
import { CreatePoolRepository } from '@/data/protocols/create-pool'
import { UUIDGenerator } from '@/domain/cryptography/uuid-generator'

interface MakeSut {
  mockCountPoolRepository: CreatePoolRepository
  uuidGeneratorMock: UUIDGeneratorMock
  sut: DbCreatePool
}

class UUIDGeneratorMock implements UUIDGenerator {
  uuid = 'any_uuid'
  generate (): string {
    return this.uuid
  }
}

class CreatePoolMockRepository implements CreatePoolRepository {
  input = {}
  async create ({ title, code }: CreatePoolRepository.Input): Promise<void> {
    this.input = {
      title,
      code
    }
  }
}

const request = { title: 'any_title' }

const makeSut = (): MakeSut => {
  const mockCountPoolRepository = new CreatePoolMockRepository()
  const uuidGeneratorMock = new UUIDGeneratorMock()
  const sut = new DbCreatePool(uuidGeneratorMock, mockCountPoolRepository)
  return {
    mockCountPoolRepository,
    uuidGeneratorMock,
    sut
  }
}

describe('DbCreatePool', () => {
  it('should createPoolRepository has been called white correct values', async () => {
    const { sut, mockCountPoolRepository } = makeSut()
    const spy = vi.spyOn(mockCountPoolRepository, 'create')
    await sut.execute(request)
    expect(spy).toBeCalledWith({ ...request, code: 'any_uuid' })
  })
  it('should throw if any throws', async () => {
    const { sut, uuidGeneratorMock } = makeSut()
    vi.spyOn(uuidGeneratorMock, 'generate').mockImplementationOnce(throwError)
    const res = sut.execute(request)
    await expect(res).rejects.toThrow()
  })
  it('should return code if successfully', async () => {
    const { sut, uuidGeneratorMock } = makeSut()
    const res = await sut.execute(request)
    expect(res).toEqual({ code: uuidGeneratorMock.uuid })
  })
})
