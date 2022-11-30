import { Heading, VStack, Text } from 'native-base'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import Logo from '../assets/logo.svg'

export function New() {
  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header title="Create new bet" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Create your own bet and{'\n'}share with your friends!
        </Heading>

        <Input mb={2} placeholder="What is the name of your bet?" />

        <Button title="CREATE YOUR BET" />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          After creating you bet, you will receive a unique code that you can
          use to invite others peoples.
        </Text>
      </VStack>
    </VStack>
  )
}
