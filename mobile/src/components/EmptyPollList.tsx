import { useNavigation } from '@react-navigation/native'
import { Row, Text, Pressable } from 'native-base'

export function EmptyPollList() {
  const { navigate } = useNavigation()

  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        You are not yet participating in any bet, how about
      </Text>

      <Pressable
        onPress={() => {
          navigate('find')
        }}
      >
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          search for a code
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        or
      </Text>

      <Pressable
        onPress={() => {
          navigate('new')
        }}
      >
        <Text textDecorationLine="underline" color="yellow.500">
          create a new
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  )
}
