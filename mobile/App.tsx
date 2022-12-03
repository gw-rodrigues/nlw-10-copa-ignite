/**
 * Adicionar typescript
 *
 * criar ficheiro com nome tsconfig.json
 * executar o comando "npx expo start"
 * ira aparecer alerta para typescript e install dependências par o typescript
 */

/**
 * Vamos usar NativeBase library (= react-native -> mais desenvolvido)
 * - componentes de layout
 * - temas, elementos, etc...
 *
 *  como: Box, VStack, Text, Input... etc :D
 *
 *  npm install native-base
 *  expo install react-native-svg@12.1.1
 *  expo install react-native-safe-area-context@3.3.2
 *
 *  <NativeBaseProvider> -> Igual Context que fornece todas as informações para usar native-base na nossa app
 *  StatusBar -> barra de cima do dispositivo que contem os icons.
 */

import { NativeBaseProvider, StatusBar } from 'native-base'
import { AuthContextProvider } from './src/context/AuthContext'
import { Loading } from './src/components/Loading'
import { Routes } from './src/routes'

/**
 * Install and import fonts
 * -> npx expo install expo-font @expo-google-fonts/roboto
 */
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

/**
 * Importing custom theme to use with Native-base
 */
import { THEME } from './src/styles/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
