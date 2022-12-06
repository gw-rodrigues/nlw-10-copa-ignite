import { useRoute } from '@react-navigation/native'
import { HStack, useToast, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { Share } from 'react-native'
import { api } from '../services/api'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { PollCardProps } from '../components/PollCard'
import { PollHeader } from '../components/PollHeader'
import { EmptyMyPollList } from '../components/EmptyMyPollList'
import { Option } from '../components/Option'
import { Guesses } from '../components/Guesses'
import { Ranking } from '../components/Ranking'

interface RouteParams {
  id: string
}

export function Details() {
  const [selectedOption, setSelectedOption] = useState<'guesses' | 'rating'>(
    'guesses',
  )
  const [isLoading, setIsLoading] = useState(true)
  const [pollsDetails, setPollsDetails] = useState<PollCardProps>(
    {} as PollCardProps,
  )
  /**
   * -> useRoute - vai permitir pegar os data enviados dentro dos params enviado pelo "navigate"
   * - depois do useRoute vamos buscar os params, com tipagem de interface para os params recebidos.
   */
  const route = useRoute()
  const { id } = route.params as RouteParams
  const toast = useToast()

  async function fetchPollDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/polls/${id}`)
      setPollsDetails(response.data.poll)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Error, unable to load bet details.',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCodeShare() {
    /**
     * -> Share - método do react-native para poder partilhar informações
     *    - este método é uma Promise
     */
    await Share.share({
      message: pollsDetails.code,
    })
  }

  useEffect(() => {
    fetchPollDetails()
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={pollsDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pollsDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PollHeader data={pollsDetails} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Your guesses"
              isSelected={selectedOption === 'guesses'}
              onPress={() => setSelectedOption('guesses')}
            />
            <Option
              title="Group rating"
              isSelected={selectedOption === 'rating'}
              onPress={() => setSelectedOption('rating')}
            />
          </HStack>

          {selectedOption === 'guesses' ? (
            <Guesses poolId={pollsDetails.id} code={pollsDetails.code} />
          ) : (
            <Ranking poolId={pollsDetails.id} />
          )}
        </VStack>
      ) : (
        <EmptyMyPollList code={pollsDetails.code} />
      )}
    </VStack>
  )
}
