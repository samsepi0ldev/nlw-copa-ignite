
import { AuthenticationService } from '@/data/use-cases/authentication'
import { Authentication } from '@/domain/use-cases/authentication'
import { JwtAdapter } from '@/infra/services/jwt-adapter'

export const makeAuthentication = (): Authentication => {
  const jwtAdapter = new JwtAdapter()
  return new AuthenticationService(jwtAdapter)
}
