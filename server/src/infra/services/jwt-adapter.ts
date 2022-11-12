import { TokenGenerator } from '@/data/protocols/token-generator'
import { app } from '@/main/config/app'

export class JwtAdapter implements TokenGenerator {
  async generate ({ id, name, avatar }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const token = await app.jwt.sign({
      name,
      avatar
    }, {
      sub: id,
      expiresIn: '7 days'
    })
    return { token }
  }
}
