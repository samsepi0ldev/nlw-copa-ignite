import { throwError } from './../../helper/throw'
import { describe, expect, it, vi } from 'vitest'
import { OAuthServiceGoogle } from '@/data/protocols/oauth'
import { LoadUserByGoogleIdRepository } from '@/data/protocols/load-user-by-google-id'
import { CreateUserRepository } from '@/data/protocols/create-user'
import { DbCreateUser } from '@/data/use-cases/create-user'

const accessToken = 'any_token'

class OAuthServiceGoogleMoke implements OAuthServiceGoogle {
  data = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    picture: 'any_picture'
  }

  async getUser (input: OAuthServiceGoogle.Input): Promise<OAuthServiceGoogle.Output> {
    return this.data
  }
}

class LoadUserByGoogleIdRepositoryMock implements LoadUserByGoogleIdRepository {
  data = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    avatar: 'any_picture',
    googleId: 'any_googleId'
  }

  async loadByGoogleId (input: LoadUserByGoogleIdRepository.Input): Promise<LoadUserByGoogleIdRepository.Output> {
    return this.data
  }
}

class CreateUserRepositoryMock implements CreateUserRepository {
  data = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    avatar: 'any_picture',
    googleId: 'any_googleId'
  }

  async create (input: CreateUserRepository.Input): Promise<CreateUserRepository.Output> {
    return this.data
  }
}

interface MakeSut {
  oAuthServiceGoogleMoke: OAuthServiceGoogleMoke
  loadUserByGoogleIdRepositoryMock: LoadUserByGoogleIdRepositoryMock
  createUserRepositoryMock: CreateUserRepositoryMock
  sut: DbCreateUser
}

const makeSut = (): MakeSut => {
  const oAuthServiceGoogleMoke = new OAuthServiceGoogleMoke()
  const loadUserByGoogleIdRepositoryMock = new LoadUserByGoogleIdRepositoryMock()
  const createUserRepositoryMock = new CreateUserRepositoryMock()
  const sut = new DbCreateUser(
    oAuthServiceGoogleMoke,
    loadUserByGoogleIdRepositoryMock,
    createUserRepositoryMock
  )
  return {
    sut,
    oAuthServiceGoogleMoke,
    loadUserByGoogleIdRepositoryMock,
    createUserRepositoryMock
  }
}

describe('DbCreateUser', () => {
  it('Should verify if auth called with correct value', async () => {
    const { sut, oAuthServiceGoogleMoke } = makeSut()
    const spy = vi.spyOn(oAuthServiceGoogleMoke, 'getUser')
    await sut.execute({ accessToken })
    expect(spy).toBeCalledWith({ accessToken })
  })
  it('Should return UnauthorizedError if oAuthServiceGoogleMoke is undefined ', async () => {
    const { sut, oAuthServiceGoogleMoke } = makeSut()
    vi.spyOn(oAuthServiceGoogleMoke, 'getUser').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
    const res = sut.execute({ accessToken })
    await expect(res).rejects.toThrow()
  })
  it('Should return throw if throws', async () => {
    const { sut, oAuthServiceGoogleMoke } = makeSut()
    vi.spyOn(oAuthServiceGoogleMoke, 'getUser').mockImplementationOnce(throwError)
    const res = sut.execute({ accessToken })
    await expect(res).rejects.toThrow()
  })
  it('Should loadUserByGoogleIdRepository called with correct value', async () => {
    const { sut, loadUserByGoogleIdRepositoryMock } = makeSut()
    const spy = vi.spyOn(loadUserByGoogleIdRepositoryMock, 'loadByGoogleId')
    await sut.execute({ accessToken })
    expect(spy).toBeCalledWith({ googleId: 'any_id' })
  })
  it('Should return throw if loadUserByGoogleIdRepository throws', async () => {
    const { sut, loadUserByGoogleIdRepositoryMock } = makeSut()
    vi.spyOn(loadUserByGoogleIdRepositoryMock, 'loadByGoogleId').mockImplementationOnce(throwError)
    const res = sut.execute({ accessToken })
    await expect(res).rejects.toThrow()
  })
  it('Should createUserRepository called with correct value', async () => {
    const { sut, createUserRepositoryMock, oAuthServiceGoogleMoke, loadUserByGoogleIdRepositoryMock } = makeSut()
    vi.spyOn(loadUserByGoogleIdRepositoryMock, 'loadByGoogleId').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const spy = vi.spyOn(createUserRepositoryMock, 'create')
    await sut.execute({ accessToken })
    expect(spy).toBeCalledWith({
      name: oAuthServiceGoogleMoke.data.name,
      email: oAuthServiceGoogleMoke.data.email,
      avatar: oAuthServiceGoogleMoke.data.picture,
      googleId: oAuthServiceGoogleMoke.data.id
    })
  })
  it('Should return throw if createUserRepository throws', async () => {
    const { sut, createUserRepositoryMock, loadUserByGoogleIdRepositoryMock } = makeSut()
    vi.spyOn(loadUserByGoogleIdRepositoryMock, 'loadByGoogleId').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    vi.spyOn(createUserRepositoryMock, 'create').mockImplementationOnce(throwError)
    const res = sut.execute({ accessToken })
    await expect(res).rejects.toThrow()
  })
  it('Should return token if success', async () => {
    const { sut } = makeSut()
    const res = await sut.execute({ accessToken })
    expect(res).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      avatar: 'any_picture',
      googleId: 'any_googleId'
    })
  })
})
