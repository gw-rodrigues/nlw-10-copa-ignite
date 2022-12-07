import { createContext, ReactNode, useEffect, useState } from 'react'

//Importações para fazer a autenticação
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { api } from '../services/api'

//garantir o redirecionamento do navegador, etc...
WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextProps {
  user: UserProps
  signIn: () => Promise<void>
  isUserLoading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

//inciamos o context com nossas interfaces
export const AuthContext = createContext({} as AuthContextProps)

//criamos um provider para armazenar conteúdo do AuthContext, e partilhar toda aplicação
// children ??? -> irá ser a nossa app (toda) passada dentro do provider, recebendo as informações
// -> depois na App adicionar o <AuthContextProvider> ...componentes...  </AuthContextProvider>
export function AuthContextProvider({ children }: AuthProviderProps) {
  /**
   * estado para armazenar as informações do usuário recebido do google auth
   * - inicia o user vazio mais com tipo UserProps - useState<UserProps>({} as UserProps)
   *
   * estado para verificar se o fluxo autenticação esta a acontecer
   * - adicionado no contexto caso quiser saber se o fluxo está acontecer em outros lugares da aplicação
   */
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)
  /**
   * Para fazer a conexão com google api auth
   * - id cliente criado
   * - url redirecionamento
   * - scopes quais informações iremos obter do cliente, que foi criado no google api
   *
   * queremos obter a:
   * - request
   * - response
   * - promptAsync: função que permite iniciar fluxo de autenticação
   */

  /**
   * PARA USAR VARIÁVEIS DE AMBIENTE
   * - precisamos instalar 2 bibliotecas
   * -> dotenv
   * -> babel-plugin-inline-dotenv
   *
   * -> npm i dotenv babel-plugin-inline-dotenv
   *
   * PRECISAMOS TAMBÉM ADICIONAR NO babel.config.js
   * -> plugin: ['inline-dotenv'],
   */
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  })

  //para obter a uri para redirect
  //console.log(AuthSession.makeRedirectUri({ useProxy: true }))

  async function signIn() {
    try {
      /**
       * chamamos a função await promptAsync() para iniciar processo de autenticação
       */
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.log(error)
      throw error //manda o erro para a função que chamou método signIn
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true)

      /**
       * Iremos enviar para o backend o token gerado pelo google auth depois login válido
       * Backend irá pegar esse token guardar na base de dados.
       */
      const tokenResponse = await api.post('/users', { access_token })
      console.log(tokenResponse.data.token)
      /**
       * Para podermos passar o parâmetro de token no "headers" recebido do google auth, validando nosso login, com backend
       * vamos definir no defaults, headers a authorization com Bearer com access_token
       * Assim no headers de todas requisições estamos identificando o user que foi criado.
       */
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${tokenResponse.data.token}`

      /**
       * Iremos buscar no backend os dados do user, que foi devolvido pelo backend
       * O backend com o token do user irá no google oauth e buscar informações deste user
       */
      const userInfoResponse = await api.get('/me')

      //Vamos pegar os dados do user e guardar no nosso state
      //userInfoResponse : { user: { sub:..., name:..., avatarUrl:..., exp:..., iat:..., } }
      setUser(userInfoResponse.data.user)
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    /**
     * vamos verificar se após a autenticação api retornar um tipo "success" e um token de acesso "accessToken"
     * chamamos a função para autenticar com google
     */
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        isUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
