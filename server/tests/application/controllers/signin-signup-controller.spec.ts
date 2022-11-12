import { throwError } from './../../helper/throw'
import { badRequest, ok, serverError } from '@/application/helpers/http-helper'
import { describe, expect, it, vi } from 'vitest'
import { RequiredFieldError } from '@/application/errors/validation'
import { UnauthorizedError } from '@/application/errors/unauthorized-error'
import { LoginOrCreateUserController } from '@/application/controllers/login-or-create-user-controller'
import { CreateUser } from '@/domain/use-cases/create-user'
import { Authentication } from '@/domain/use-cases/authentication'

interface MakeSut {
  sut: LoginOrCreateUserController
  createUserMock: CreateUserMock
  authenticationMock: AuthenticationMock
}

export class CreateUserMock implements CreateUser {
  async execute (input: CreateUser.Input): Promise<CreateUser.Output> {
    return {
      id: 'any_id',
      name: 'any_name',
      avatar: 'any_avatar'
    }
  }
}

export class AuthenticationMock implements Authentication {
  async auth (input: Authentication.Input): Promise<Authentication.Output> {
    return { token: 'any_token' }
  }
}

const makeSut = (): MakeSut => {
  const createUserMock = new CreateUserMock()
  const authenticationMock = new AuthenticationMock()
  const sut = new LoginOrCreateUserController(createUserMock, authenticationMock)
  return {
    sut,
    createUserMock,
    authenticationMock
  }
}

const request = {
  accessToken: 'any_token'
}

describe('SignInSignUpController', () => {
  it('Should return bad request if missing param', async () => {
    const { sut } = makeSut()
    const res = await sut.handle({})
    expect(res).toEqual(badRequest(new RequiredFieldError('accessToken')))
  })
  it('Should call auth with value', async () => {
    const { sut, authenticationMock } = makeSut()
    const spy = vi.spyOn(authenticationMock, 'auth')
    await sut.handle(request)
    expect(spy).toBeCalledWith({
      id: 'any_id',
      name: 'any_name',
      avatar: 'any_avatar'
    })
  })
  it('Should return server erro if throws', async () => {
    const { sut, authenticationMock } = makeSut()
    vi.spyOn(authenticationMock, 'auth').mockImplementationOnce(throwError)
    const res = await sut.handle(request)
    expect(res).toEqual(serverError(new Error()))
  })
  it('Should return access token if success', async () => {
    const { sut } = makeSut()
    const res = await sut.handle(request)
    expect(res).toEqual(ok({ token: 'any_token' }))
  })
  it('Should called with correct values', async () => {
    const { sut, createUserMock } = makeSut()
    const spy = vi.spyOn(createUserMock, 'execute')
    await sut.handle(request)
    expect(spy).toBeCalledWith(request)
  })
  it('Should unauthorized error if user is not authorized', async () => {
    const { sut, createUserMock } = makeSut()
    vi.spyOn(createUserMock, 'execute').mockImplementationOnce(() => {
      throw new UnauthorizedError()
    })
    const res = await sut.handle(request)
    expect(res).toEqual(badRequest(new UnauthorizedError()))
  })
  it('Should server error if throws', async () => {
    const { sut, createUserMock } = makeSut()
    vi.spyOn(createUserMock, 'execute').mockImplementationOnce(throwError)
    const res = await sut.handle(request)
    expect(res).toEqual(serverError(undefined))
  })
})
