import { FlatList, useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { EmptyRakingList } from './EmptyRakingList'
import { Loading } from './Loading'
import { PollRankingProps, RankingCard } from './RankingCard'

interface Props {
  poolId: string
}

export function Ranking({ poolId }: Props) {
  const [pollRanking, setPollRanking] = useState<PollRankingProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/polls/${poolId}/ranking`)
      setPollRanking(response.data.poll.ranking)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Error, unable to load games.',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGames()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={pollRanking}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RankingCard data={item} />}
      _contentContainerStyle={{ pb: 32 }}
      ListEmptyComponent={() => <EmptyRakingList />}
    />
  )
}
