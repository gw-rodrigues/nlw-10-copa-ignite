import { Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'
import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

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

/**
 * Authentication with google
 *
 * Para fazer autenticação com google precisamos:
 * -> fazer registo da nossa app no google - https://console.cloud.google.com/
 *    -> criar novo projeto (só nome) - selecionar projeto
 *    -> menu -> api & serviços -> tela de permissão OAuth
 *        -> Externo -> precisa (nome, email, dados desenvolvedor)
 *        -> Escopo -> adicionar escopo (email, user info) *quais info queremos do user
 *        -> Usuário de teste -> nao
 *        -> voltar para painel
 *        -> PUBLICAR APLICATIVO
 *
 *    -> menu -> api & serviços -> credenciais
 *    -> criar credencial -> ID do Cliente do OAuth
 *    -> tipo aplicativo -> aplicativo da web
 *    -> URIs (Authorized JavaScript origins): https://auth.expo.io
 *    -> Authorized redirect URIs: https://auth.expo.io/@your-expo-username/your-project-slug (há forma automática de obter esse uri)
 *      -> import * as AuthSession from 'expo-auth-session'
 *      -> console.log(AuthSession.makeRedirectUri({ useProxy: true }))
 *      -> no console: https://auth.expo.io/@gw-rodrigues/mobile
 *      -> !!! caso nao aparecer precisa registar no https://expo.dev, depois terminar "npx expo login" e "npx expo whoami"
 *
 * -> instalar: npx expo install expo-auth-session expo-random  (gere a troca de tokens)
 * -> instalar: npx expo install expo-web-browser   (abrir browser para user fazer login)
 * -> criar um schema para receber o token após o processo autenticação, validado, fazendo link de redirecionamento:
 *    -> app.json : "scheme": "nlwcopamobile",
 */

export function SignIn() {
  const { signIn } = useAuth()

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        title="ENTER WITH GOOGLE"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        type="SECONDARY"
        mt={12}
        onPress={signIn}
      />
      <Text color="white" textAlign="center" mt={4}>
        We do not use any information other than {'\n'} your email to create
        your account.
      </Text>
    </Center>
  )
}
