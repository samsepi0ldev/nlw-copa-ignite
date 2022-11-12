import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as  AuthSession from 'expo-auth-session'
import { api } from '../services/api'

interface AuthProviderProps {
  children: ReactNode
}

type UserProps = {
  id: string
  name: string
  avatar: string
}

interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider (props: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [user, setUser] = useState<UserProps>({} as UserProps)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn () {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle (accessToken: string) {
    try {
      setIsUserLoading(true)
      const response = await api.post('/users', { accessToken })
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      const userResponse = await api.get('/me')
      setUser({
        id: userResponse.data.user.sub,
        name: userResponse.data.user.name,
        avatar: userResponse.data.avatar
      })
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])
  return (
    <AuthContext.Provider value={{
      user,
      isUserLoading,
      signIn
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}