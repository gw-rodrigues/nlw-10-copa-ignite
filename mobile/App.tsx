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

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor={'fuchsia.400'} alignItems="center">
        <Text color="black" fontSize={24}>
          Hello World!
        </Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  )
}
