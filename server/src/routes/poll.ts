/**
 * - Precisamos do Prisma que está/foi movido para pasta lib, precisamos partilhar a conexão com banco.
 *
 * Para trabalhar com Fastify com routes, temos usar forma de plugins usada abaixo.
 * -> temos passar Fastify com parâmetro.
 */

//Para criar id únicos
import ShortUniqueId from 'short-unique-id'

/** Vamos usar o Zod, nao e so para validação de forms, mais também para validar os valores recebidos através do method "post" body */
import { z } from 'zod'

import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { authenticate } from '../plugins/authenticate'
import { userRoutes } from './user'

// !!! importante que seja uma "async" function
export async function pollRoutes(fastify: FastifyInstance) {
  /** Adicionar as nossa rotas */
  fastify.get(
    '/polls/count',
    /** todas queries do prisma demoram, sao externas, sao uma promise, function tem de ser async */
    async () => {
      /* findMany = select */
      const count = await prisma.poll.count()

      return { count }
    },
  )

  /** Método "post" é usado quando iremos criar algo e daremos algo de resposta */
  /** recebe dois parâmetros função async (request, reply (=response)) */
  fastify.post('/polls', async (request, reply) => {
    /** Para usar o Zod vamos criar z.Object com variáveis a validar, depois fazer parse do request.body */
    const createPollBody = z.object({ title: z.string() })
    const { title } = createPollBody.parse(request.body)

    /** Vamos usar short-unique-id para gerar os code de 6 dígitos */
    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toLocaleUpperCase()

    /**
     * Vamos fazer verificação se user esta logado quando criar a bet
     *
     * -> request.user.sub ? id do user que está guardado dentro do token.
     * -> *.sub - nao existe e da erro no typescript porque e opcional no jwt, há várias formas resolver
     * -> vamos usar d.ts tipos typescript na pasta @types/fastify-jwt.d.ts
     */
    try {
      await request.jwtVerify()

      await prisma.poll.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub,
            },
          },
        },
      })
    } catch {
      await prisma.poll.create({
        data: {
          title,
          code,
        },
      })
    }

    return reply.status(201).send({ title, code })
  })

  /**
   * Rotas dinâmicas
   * -> :id (um nome escolha) será dinâmica
   * -> onRequest:[authenticate] - rota só será acessível ser user for válido/autenticado
   */
  fastify.post(
    '/polls/:id/join',
    { onRequest: [authenticate] },
    async (request, reply) => {
      const joinPollBody = z.object({ code: z.string() })
      const { code } = joinPollBody.parse(request.body)

      /**
       * Com prisma, mesmo fazendo pesquisa, podemos trazer dados de relacionamentos de informação
       *  - Além de verificar se user nao tem uma bet, verificamos se ele ja faz parte da bet.
       * -> vamos usar "include" = "JOIN" (sql) - para trazer dados dos participantes (userId = request.user.sub (JWT token))
       */
      const poll = await prisma.poll.findUnique({
        where: {
          code,
        },
        include: {
          participants: {
            where: {
              userId: request.user.sub,
            },
          },
        },
      })

      if (!poll) {
        return reply.status(400).send({
          message: 'Poll not found.',
        })
      }

      if (poll.participants.length > 0) {
        return reply.status(400).send({
          message: 'You already joined this poll.',
        })
      }

      /**
       * Algumas bet nao tem owner, então o primeiro user que entrar na bet, será adicionado com owner, ownerId
       * -> usando método "update" do prisma
       */
      if (!poll.ownerId) {
        await prisma.poll.update({
          where: {
            id: poll.id,
          },
          data: {
            ownerId: request.user.sub,
          },
        })
      }

      //se user nao faz parte da bet então, iremos adicionar-lo
      await prisma.participant.create({
        data: {
          pollId: poll.id,
          userId: request.user.sub,
        },
      })

      return reply.status(201).send()
    },
  )
}
