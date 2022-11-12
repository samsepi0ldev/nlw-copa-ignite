import { Authentication } from '@/domain/use-cases/authentication'

export interface TokenGenerator {
  generate: (input: TokenGenerator.Input) => Promise<TokenGenerator.Output>
}

export namespace TokenGenerator {
  export type Input = Authentication.Input
  export type Output = Authentication.Output
}
