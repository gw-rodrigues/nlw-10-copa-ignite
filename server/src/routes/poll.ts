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

    await prisma.poll.create({
      data: {
        title,
        code,
      },
    })

    return reply.status(201).send({ title, code })
  })
}
