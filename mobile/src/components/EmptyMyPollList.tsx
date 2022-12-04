import { Row, Text, Pressable } from 'native-base'

interface Props {
  code: string
}

export function EmptyMyPollList({ code }: Props) {
  return (
    <Row flexWrap="wrap" justifyContent="center" p={4}>
      <Text color="gray.200" fontSize="sm">
        This bet has no participants yet, how about
      </Text>

      <Pressable onPress={() => {}}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          of share someone's
        </Text>
      </Pressable>

      <Text color="gray.200" fontSize="sm" mx={1}>
        bet code?
      </Text>

      <Text color="gray.200" mr={1}>
        Use the code
      </Text>

      <Text
        color="gray.200"
        fontSize="sm"
        textAlign="center"
        fontFamily="heading"
      >
        {code}
      </Text>
    </Row>
  )
}
