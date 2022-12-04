import { useState } from 'react'
import { Heading, useToast, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { api } from '../services/api'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function Find() {
  const toast = useToast()
  const { navigate } = useNavigation()

  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  async function handleJoinPoll() {
    try {
      setIsLoading(true)

      if (!code.trim()) {
        setIsLoading(false)
        return toast.show({
          title: 'Please, inform a code.',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      if (code.length < 6) {
        setIsLoading(false)
        return toast.show({
          title: 'Invalid, minimum code character is 6.',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      if (code.length >= 7) {
        setIsLoading(false)
        return toast.show({
          title: 'Invalid, maximum code character is 6.',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      await api.post('/polls/join', { code: code.toUpperCase() })

      toast.show({
        title: 'Success, you have joined the bet.',
        placement: 'top',
        bgColor: 'green.500',
      })

      setIsLoading(false)
      setCode('')
      navigate('polls')
    } catch (error) {
      //Porque vamos usar setLoading(false) aqui ?
      //porque vamos redirecionar o user para outra screen, e o try irá tentar atualizar o isLo ading, mas em outra tela.
      //pode causar error na nossa app.
      setIsLoading(false)
      console.log(error.response?.data?.message)

      console.log(error)
      /**
       * Como nosso backend retorna informação, como:
       * - bet nao foi encontrada
       * - ja faz parte desse grupo da bet
       * Vamos fazer tratamento mensagens
       */
      //message: 'Poll not found.',
      //message: 'You have already joined this poll.',

      if (error.response?.data?.message === 'Poll not found.') {
        return toast.show({
          title: 'Error, bet not found.',
          placement: 'top',
          bgColor: 'red.500',
        })
      }
      if (
        error.response?.data?.message === 'You have already joined this poll.'
      ) {
        return toast.show({
          title: 'You have already joined this bet.',
          placement: 'top',
          bgColor: 'blue.500',
        })
      }
      toast.show({
        title: 'Error, there was a problem searching the bet.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }
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

        <Input
          mb={2}
          placeholder="What is the code of the bet?"
          onChangeText={setCode}
          value={code}
          autoCapitalize="characters"
        />
        {/**
         * -> autoCapitalize="characters"
         *  - faz que o teclado fiquei letras maiúsculas, cada letra digitada volta ser maiúsculas
         */}

        <Button
          title="SEARCH BET"
          onPress={handleJoinPoll}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}
