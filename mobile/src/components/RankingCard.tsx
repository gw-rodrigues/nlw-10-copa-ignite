import { Heading, HStack, Text, VStack, Avatar, Box } from 'native-base'
import { useAuth } from '../hooks/useAuth'

export interface PollRankingProps {
  id: string
  points: number
  user: {
    id: string
    name: string
    avatarUrl: string
  }
}

interface RankingCardProps {
  data: PollRankingProps
  rank: number
}

export function RankingCard({ data, rank }: RankingCardProps) {
  //Receber user id logged - mas com nome de sub (como esta feito backend)
  const { user } = useAuth()

  return (
    <HStack
      w="full"
      h={20}
      bgColor="gray.800"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      justifyContent="space-between"
      alignItems="center"
      rounded="sm"
      mb={3}
      p={4}
    >
      <HStack>
        <Avatar
          key={data.id}
          source={{ uri: data.user.avatarUrl }}
          w={10}
          h={10}
          rounded="full"
          borderWidth={2}
          marginRight={-3}
          borderColor="gray.800"
        ></Avatar>

        <VStack ml={6}>
          <HStack alignItems="center">
            <Heading color="white" fontSize="md" fontFamily="heading">
              {data.user.name}
            </Heading>

            {user.sub === data.user.id ? (
              <Text color="gray.400" fontSize="xs" fontWeight="bold" pl={1}>
                (you)
              </Text>
            ) : null}
          </HStack>

          <Text color="gray.200" fontSize="xs">
            {data.points} point(s)
          </Text>
        </VStack>
      </HStack>
      <Box
        bgColor={rank > 3 ? 'gray.700' : 'yellow.500'}
        px={3}
        py="2px"
        rounded="2xl"
      >
        <Text
          color={rank > 3 ? 'gray.300' : 'gray.900'}
          fontSize="xs"
          fontWeight="bold"
        >
          {rank}°
        </Text>
      </Box>
    </HStack>
  )
}
