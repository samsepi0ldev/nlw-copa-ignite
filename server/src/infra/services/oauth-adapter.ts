import { OAuthServiceGoogle } from '@/data/protocols/oauth'
export class OAuthServiceGetUserInfo implements OAuthServiceGoogle {
  async getUser ({ accessToken }: OAuthServiceGoogle.Input): Promise<OAuthServiceGoogle.Output> {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const data = await response.json()
    if (data?.id !== undefined) {
      return data
    }
    return undefined
  }
}
