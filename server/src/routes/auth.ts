/**
 * - Precisamos do Prisma que está/foi movido para pasta lib, precisamos partilhar a conexão com banco.
 *
 * Para trabalhar com Fastify com routes, temos usar forma de plugins usada abaixo.
 * -> temos passar Fastify com parâmetro.
 */
import fetch from 'node-fetch'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(fastify: FastifyInstance) {
  /**
   * Criação do registo do access_token, quando feito login no app mobile através do google auth api
   */

  fastify.post('/users', async (request) => {
    //com zod verificamos de post request com access_token é uma string
    const createUserBody = z.object({
      access_token: z.string(),
    })

    const { access_token } = createUserBody.parse(request.body)

    console.log(access_token)
    /**
     * Vamos chamar api google, dados user logado.
     * Enviando no "headers" de "Authorization" o access_token recebido do app mobile.
     * Google verificar qual user está logado com o access_token enviado.
     */

    const userResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )

    /**
     * Após a a verificação do google será retornado várias informações.
     * Vamos validar com "zod" as info recebidas.
     */
    const userData = await userResponse.json()
    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    })

    const userInfo = userInfoSchema.parse(userData)

    //verificamos se existe algum user com id na database (podia ser por email, mais e melhor pelo id google)
    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    })

    //caso nao existir vamos criar um novo user com info do google auth
    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      })
    }

    //precisamos verificar sempre se user está usar a app, mobile sempre que estiver auth com google oauth.
    //como nao temos acesso a username e password, para mandar sempre para o google, precisamos de outra estratégia.
    //Vamos user o "JWT Token" - criamos no nosso backend, com data de expiração, partilhamos com nossa app, mobile,
    //esse token será salvo, cookies, etc, será sempre enviado para backend com validação nas requirições.
    //depois de backend receber token irá validar e pegar todas as informações do usuário e retorna-lo.

    return { userInfo }
  })
}
