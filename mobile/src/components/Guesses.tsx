import { Box, FlatList, useToast } from 'native-base'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { Game, GameProps } from './Game'
import { Loading } from './Loading'

interface Props {
  poolId: string
}

export function Guesses({ poolId }: Props) {
  const [games, setGames] = useState<GameProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  const toast = useToast()

  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/polls/${poolId}/games`)
      setGames(response.data.games)
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

  async function handleGuessConfirm(gameId: String) {
    try {
      if (!firstTeamPoints.trim() && !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Please, inform the score of game with your guess.',
          placement: 'top',
          bgColor: 'blue.500',
        })
      }

      await api.post(`/polls/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })

      toast.show({
        title: 'Success, guess registered.',
        placement: 'top',
        bgColor: 'green.500',
      })

      fetchGames()
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Error, unable to send you guess.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 32 }}
    />
  )
}
