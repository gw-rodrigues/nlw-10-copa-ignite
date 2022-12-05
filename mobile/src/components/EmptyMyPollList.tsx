import { Row, Text, Pressable } from 'native-base'
import { Share } from 'react-native'

interface Props {
  code: string
}

export function EmptyMyPollList({ code }: Props) {
  async function handleCodeShare() {
    /**
     * -> Share - método do react-native para poder partilhar informações
     *    - este método é uma Promise
     */
    await Share.share({
      message: code,
    })
  }

  return (
    <Row flexWrap="wrap" justifyContent="center" p={4}>
      <Text color="gray.200" fontSize="sm">
        This bet has no participants yet, how about of
      </Text>

      <Pressable onPress={handleCodeShare}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          share someone's
        </Text>
      </Pressable>

      <Text color="gray.200" fontSize="sm" mx={1}>
        bet code?
      </Text>

      <Text color="gray.200" mr={1} mt={4} width="100%" textAlign="center">
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
