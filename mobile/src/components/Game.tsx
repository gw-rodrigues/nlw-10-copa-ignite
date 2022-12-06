import { Button, HStack, Text, useTheme, VStack } from 'native-base'
import { X, Check } from 'phosphor-react-native'
import { getName } from 'country-list'
import dayjs from 'dayjs'
//import ptBR from 'dayjs/locale/pt-br'

import { Team } from './Team'

interface GuessProps {
  id: string
  gameId: string
  createdAt: string
  participantId: string
  firstTeamPoints: number
  secondTeamPoints: number
}

export interface GameProps {
  id: string
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  guess: null | GuessProps
  date: string
}

interface Props {
  data: GameProps
  onGuessConfirm: () => void
  setFirstTeamPoints: (value: string) => void
  setSecondTeamPoints: (value: string) => void
}

export function Game({
  data,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onGuessConfirm,
}: Props) {
  const { colors, sizes } = useTheme()

  const datePassed = dayjs().isAfter(dayjs(data.date))
  const hasGuess = data.guess && !datePassed ? true : false

  /**
   * Select other languages to dayjs format
   *
   * const formatedDate = dayjs(data.date).locale(ptBR).format('DD MMMM [of] YYYY [at] HH:00[h]')
   */
  const formatedDate = dayjs(data.date).format('MMMM DD[,] YYYY [at] HH:00[h]')

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs.{' '}
        {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {formatedDate}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          inputDisabled={hasGuess}
          inputValue={hasGuess ? data.guess.firstTeamPoints : 0}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          inputDisabled={hasGuess}
          inputValue={hasGuess ? data.guess.secondTeamPoints : 0}
        />
      </HStack>

      {!hasGuess && (
        <Button
          size="xs"
          w="full"
          bgColor="green.500"
          mt={4}
          onPress={onGuessConfirm}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRM GUESS
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      )}
    </VStack>
  )
}
