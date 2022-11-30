/**
 *  npm i typescript -D
 *  npm i fastify
 *  npm i tsx -D       // Ajuda na compilação do código typescript para javascript e executa o ficheiro convertido,
 *  evita usar vários, como "npx tsc " e "node src/server.js" - depois so adicionamos no scripts(package.json) - "dev": "tsx watch src/server"
 *  basta no terminar usar "npm run dev"
 */

/**
 * npm i prisma -D -> interface
 * npm i @prima/client -> conexão com prisma
 * npx prisma init --datasource-provider SQLite -> usar SQLite database, por padrão é PostSQL
 *
 * .env -> contém local da database
 * schema.prisma -> podemos criar as tabelas/models (continuação código)
 *
 * npm i prisma-erd-generator @mermaid-js/mermaid-cli -D ->  Prisma ERD: Criação de diagramas da database é usa mermaid. | Mermaid ferramenta criação de diagramas.
 */

/**
 * Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a
 * powerful plugin architecture, inspired by Hapi and Express.
 *
 * npm i @fastify/cors -> mecanismo de segurança, caso nao tiver o cors o frontend nao conseguira acessar o backend.
 */
import Fastify from 'fastify'
import cors from '@fastify/cors'

import ShortUniqueId from 'short-unique-id'

/** Vamos usar o Zod, nao e so para validação de forms, mais também para validar os valores recebidos através do method "post" body */
import { z } from 'zod'

/** Vantagem de utilizar prisma, ter inteligencia de auto-complete e ajuda a fazer as queries e utilização das tabelas/models. */
/** import prisma client */ /** Iniciar o prisma client para conectar com database */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'], //print terminar log todas queries realizadas
})

/** Alguns frameworks usam nome da função como bootstrap - primeira coisa ser executada na app */
async function bootstrap() {
  /** agora vamos criar nosso servidor */
  const fastify = Fastify({ logger: true })

  //Adicionar o cors ao fastify para liberar acesso
  await fastify.register(cors, {
    origin: true, //origin : true indica que qualquer app externa possa acessar no backend/server. Melhor o dominio: www.rocketseat.com
  })

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

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()
    return { count }
  })

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()
    return { count }
  })

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

  //Para funcionar na web e mobile, em mobile (android, etc) devemos adicionar o host.
  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()
