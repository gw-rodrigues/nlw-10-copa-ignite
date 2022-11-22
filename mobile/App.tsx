/**
 * Adicionar typescript
 *
 * criar ficheiro com nome tsconfig.json
 * executar o comando "npx expo start"
 * ira aparecer alerta para typescript e install dependências par o typescript
 */

import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <Text style={styles.title}>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
})
