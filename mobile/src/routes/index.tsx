/**
 * Neste ficheiro vamos usar o novo container de navegação
 * e partilhar com a nossa aplicação.
 *
 * Para poder fazer outras ações, como verificar se user está logado.
 */

/**
 * NavigationContainer -> nosso menu/barra de navegação que vai receber as rotas do AppRoutes
 *
 * *Assim importamos esse ficheiro no App.tsx para podermos usar a navegação
 */

/**
 * Nas Routes precisamos ter as informações do user quando está logado, para poder exibir as rotas,
 * caso nao esteja exibimos a rota de signIn
 *
 * -> As informações do user está partilhada através do contexto (hooks - useAuth), que foi obtido através da screen SingIn
 *
 */

import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import { SignIn } from '../screens/SignIn'
import { AppRoutes } from './app.routes'

export function Routes() {
  /**
   * Iremos verificar se user está logado caso no contexto o user tenha um nome (name)
   * Caso nao for user válido ele nao vai ter nome.
   */
  const { user } = useAuth()
  return (
    <NavigationContainer>
      {user.name ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}
