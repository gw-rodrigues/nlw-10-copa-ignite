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
 */

import { StatusBar } from 'expo-status-bar'

import { Center, NativeBaseProvider, Text } from 'native-base'

/**
 * Importing custom theme to use with Native-base
 */
import { THEME } from './src/styles/theme'

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

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <Center flex={1} bgColor="gray.900" alignItems="center">
        <Text color="white" fontSize={24}>
          Hello World!
        </Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  )
}
