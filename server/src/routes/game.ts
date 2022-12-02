/**
 * - Precisamos do Prisma que está/foi movido para pasta lib, precisamos partilhar a conexão com banco.
 *
 * Para trabalhar com Fastify com routes, temos usar forma de plugins usada abaixo.
 * -> temos passar Fastify com parâmetro.
 */

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { authenticate } from '../plugins/authenticate'

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/polls/:id/games',
    { onRequest: [authenticate] },
    async (request) => {
      const getPollsParams = z.object({
        id: z.string(),
      })

      const { id } = getPollsParams.parse(request.params)

      /**
       * Além de buscar os games, vamos retorna se o user ja fez palpites para este jogo
       */
      const games = await prisma.game.findMany({
        orderBy: {
          date: 'desc',
        },
        include: {
          guesses: {
            where: { participant: { userId: request.user.sub, pollId: id } },
          },
        },
      })

      /**
       * Como game pode ter vários palpites, mas o 1 user so pode fazer 1 palpite por jogo, fazendo a query acima
       * retorna um "[]", e nao queremos, iremos verificar se existe um palpite, do user, criar campo "guess"
       * e retorna o primeiro guess, caso existir, se nao null.
       * ! definindo o campo "guesses" = undefined - irá fazer com este campo sumir/apagado.
       */
      return {
        games: games.map((game) => {
          return {
            ...game,
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined,
          }
        }),
      }
    },
  )
}
