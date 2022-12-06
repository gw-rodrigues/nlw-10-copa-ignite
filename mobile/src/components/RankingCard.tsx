import { Heading, HStack, Text, VStack, Avatar, Box } from 'native-base'

export interface PollRankingProps {
  id: string
  points: number
  createdAt: Date
  participant: {
    user: {
      name: string
      avatarUrl: string
    }
  }
}

interface RankingCardProps {
  data: PollRankingProps
}

export function RankingCard({ data }: RankingCardProps) {
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
          key={1}
          source={{ uri: data.participant.user.avatarUrl }}
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
              {data.participant.user.name}
            </Heading>
            <Text color="gray.400" fontSize="xs" fontWeight="bold" pl={1}>
              (voce)
            </Text>
          </HStack>

          <Text color="gray.200" fontSize="xs">
            {data.points} pontos(s)
          </Text>
        </VStack>
      </HStack>
      <Box bgColor="yellow.500" px={3} py="2px" rounded="2xl">
        <Text color="gray.900" fontSize="xs" fontWeight="bold">
          1°
        </Text>
      </Box>
    </HStack>
  )
}
