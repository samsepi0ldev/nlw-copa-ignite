import { TokenGenerator } from '@/data/protocols/token-generator'
import { Authentication } from '@/domain/use-cases/authentication'

export class AuthenticationService implements Authentication {
  constructor (private readonly tokenGenerator: TokenGenerator) {}

  async auth (input: Authentication.Input): Promise<Authentication.Output> {
    return await this.tokenGenerator.generate(input)
  }
}
