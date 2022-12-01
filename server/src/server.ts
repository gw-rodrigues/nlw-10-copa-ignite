/**
 * Node tem pattern interno chamado Singleton
 * -> singleton : fazer que as informações sejam reaproveitas em todos os arquivos, é nao criadas.
 */

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

/**
 * Instalando JWT para criação de tokens com expiração para validar a conexão do user com backend, depois logado.
 */
import jwt from '@fastify/jwt'

/**
 * Importamos as route para fazer register no Fastify
 */
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import { guessRoutes } from './routes/guess'
import { pollRoutes } from './routes/poll'
import { userRoutes } from './routes/user'

/** Alguns frameworks usam nome da função como bootstrap - primeira coisa ser executada na app */
async function bootstrap() {
  /** agora vamos criar nosso servidor */
  const fastify = Fastify({ logger: true })

  //Adicionar o cors ao fastify para liberar acesso
  await fastify.register(cors, {
    origin: true, //origin : true indica que qualquer app externa possa acessar no backend/server. Melhor o dominio: www.rocketseat.com
  })

  /**
   * Como estamos a routes no Fastify, em vez escrever rotas todos num so ficheiro.
   * - precisamos fazer um fastify.register(nome-rota)
   * ? - irá registar todas os métodos/route criadas dentro ficheiro registado.
   *
   * !!! como deve ser async function devemos usar "await"
   */

  //!!! -> secret deve SEMPRE está variável ambiente!!! file -> .env
  //precisamos verificar sempre se user está usar a app, mobile sempre que estiver auth com google oauth.
  //como nao temos acesso a username e password, para mandar sempre para o google, precisamos de outra estratégia.
  //Vamos user o "JWT Token" - criamos no nosso backend, com data de expiração, partilhamos com nossa app, mobile,
  //esse token será salvo, cookies, etc, será sempre enviado para backend com validação nas requirições.
  //depois de backend receber token irá validar e pegar todas as informações do usuário e retorna-lo.
  await fastify.register(jwt, {
    secret: 'nlwcopa',
  })

  await fastify.register(authRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(pollRoutes)
  await fastify.register(userRoutes)

  //Para funcionar na web e mobile, em mobile (android, etc) devemos adicionar o host.
  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()
