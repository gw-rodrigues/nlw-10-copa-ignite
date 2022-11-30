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

    return { userInfo }
  })
}
