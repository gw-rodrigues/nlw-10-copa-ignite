import { useCallback, useState } from 'react'
/**
 * Métodos para exibir listagem de dados com performance (native-base)
 * -> FlatList - mais indicado quando nao sabemos quando itens iremos renderizar
 * -> ScrollView
 */
import { Icon, useToast, VStack, FlatList } from 'native-base'
import { Octicons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { api } from '../services/api'
import { PollCard, PollCardProps } from '../components/PollCard'
import { Loading } from '../components/Loading'
import { EmptyPollList } from '../components/EmptyPollList'

export function Polls() {
  /**
   * Iremos usar o navigation para navegar através do Button "search by code" para outro screen.
   */
  const { navigate } = useNavigation()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [polls, setPolls] = useState<PollCardProps[]>([])

  async function fetchPolls() {
    try {
      setIsLoading(true)
      const response = await api.get('/polls')
      setPolls(response.data.polls)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Error, unable to load your bets.',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * -> useFocusEffect - porque? ao contrário do useEffect que inicia sempre quando o componente carrega
   *  o useFocusEffect inicia sempre que o componente e focado (é selecionado), diferente da app web o app mobile
   *  so carrega uma fez fazendo assim o useEffect iniciar apenas uma vez toda nossa app, mesmo mudando de screens.
   */
  /**
   * Vamos fazer combinação do useFocusEffect and useCallback
   * -> useFocusEffect vai inicia sempre interface receber foco de volta
   * -> useCallback - garante que esta função nao seja executada múltiplas vezes (anotando a referencia dessa função)
   *  !!! recomendado usar os 2 métodos para garantir performance
   */
  useFocusEffect(
    useCallback(() => {
      fetchPolls()
    }, []),
  )

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="MY BETS" />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="SEARCH BET BY CODE"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate('find')}
        />
      </VStack>
      {/**
       *  -> FlatList
       *    - data: recebe lista com items
       *    - keyExtractor: precisar ser valor único, podemos buscar dos nossa lista. (item) => item.id
       *    - renderItem: qual componente/elemento queremos renderizar cada item. (temos desestruturar o item) ({ item }) => <PollCard data={item} />
       *    - podemos adicionar alguns elementos de estilo como "px, py, etc" padding
       *    - showsVerticalScrollIndicator: true ou false scroll vertical
       *    - _contentContainerStyle={{ pb: 10 }} : podemos adicionar estilo internos
       *    - ListEmptyComponent={() => <EmptyPollList />} - quando a lista esta vazia podemos apresentar um compoentne
       */}
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PollCard data={item} />}
          ListEmptyComponent={() => <EmptyPollList />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 32 }}
          px={5}
        />
      )}
    </VStack>
  )
}
