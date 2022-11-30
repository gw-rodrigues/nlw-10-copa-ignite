import { Heading, VStack } from 'native-base'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function Find() {
  return (
    <VStack bgColor="gray.900" flex={1}>
      <Header title="Search by unique code" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Find a specific bet using{'\n'}the unique code.
        </Heading>

        <Input mb={2} placeholder="What is the code of the bet?" />

        <Button title="SEARCH BET" />
      </VStack>
    </VStack>
  )
}
