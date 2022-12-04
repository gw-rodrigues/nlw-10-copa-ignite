import { Heading, VStack, Text, useToast } from 'native-base'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import Logo from '../assets/logo.svg'
import { useState } from 'react'
import { api } from '../services/api'

export function New() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  /**
   * useToast - mostra mensagens de alerta, info, etc para user.
   *  - existe outras opções como "Alert" do react-native
   * -> Com o useToast já vem como animação e com estilos predefinidos.
   *  -> podemos alterar algumas opções, como local irá aparecer, titulo e color mensagem.
   *  -> title, placement (left,top,etc), bgColor (cor caixa)
   */
  const toast = useToast()

  async function handlePollCreate() {
    //Vamos usar método trim para remover os espaço e verificar se existe algum texto
    if (!title.trim()) {
      return toast.show({
        title: 'Please, inform the name of your bet.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    if (title.length < 4) {
      return toast.show({
        title: 'Invalid bet name, minimum of 4 character.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    try {
      setIsLoading(true)

      await api.post('/polls', { title })

      toast.show({
        title: 'Success, you bet has been created!',
        placement: 'top',
        bgColor: 'green.500',
      })

      setTitle('')
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Error, unable to create your bet!',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

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

        <Input
          mb={2}
          placeholder="What is the name of your bet?"
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title="CREATE YOUR BET"
          onPress={handlePollCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          After creating you bet, you will receive a unique code that you can
          use to invite others peoples.
        </Text>
      </VStack>
    </VStack>
  )
}
