/**
 * - Precisamos do Prisma que está/foi movido para pasta lib, precisamos partilhar a conexão com banco.
 *
 * Para trabalhar com Fastify com routes, temos usar forma de plugins usada abaixo.
 * -> temos passar Fastify com parâmetro.
 */

import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()
    return { count }
  })
}
