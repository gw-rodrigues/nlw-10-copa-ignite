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

import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}
