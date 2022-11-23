import { Center, Text } from 'native-base'
import { StatusBar } from 'expo-status-bar'

export function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900" alignItems="center">
      <Text color="white" fontSize={24}>
        Hello World!
      </Text>
      <StatusBar style="auto" />
    </Center>
  )
}
