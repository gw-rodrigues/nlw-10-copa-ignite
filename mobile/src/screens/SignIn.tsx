import { Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

/**
 * Para usar svg no react-native precisamos instalar:
 * -> 1 ja foi instalada com o native-base.
 * -> npm i react-native-svg-transformer
 *
 * Agora precisamos criar um ficheiro de configuração
 * -> metro.config.js -> EXPO SDK
 * https://github.com/kristerkari/react-native-svg-transformer
 *
 * Depois temos quer ciar os tipos/tipagens por causa do typescript
 * src/@types/svg.d.ts
 *
 * -> código da tipagem está no link acima.
 */

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'

export function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        title="ENTER WITH GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        type="SECONDARY"
        mt={12 }
      />
      <Text color="white" textAlign="center" mt={4}>
        We do not use any information other than {'\n'} your email to create
        your account.
      </Text>
    </Center>
  )
}
