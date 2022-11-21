/**
 *  npm i typescript -D
 *  npm i fastify
 *  npm i tsx -D       // Ajuda na compilação do código typescript para javascript e executa o ficheiro convertido,
 *  evita usar vários, como "npx tsc " e "node src/server.js" - depois so adicionamos no scripts(package.json) - "dev": "tsx src/server"
 *  basta no terminar usar "npm run dev"
 */

/**
 * Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a
 * powerful plugin architecture, inspired by Hapi and Express.
 */
import Fastify from 'fastify'

/** Alguns frameworks usam nome da função como bootstrap - primeira coisa ser executada na app */
async function bootstrap() {
  /** agora vamos criar nosso servidor */

  const fastify = Fastify({ logger: true })

  await fastify.listen({ port: 3333 })
}

bootstrap()
