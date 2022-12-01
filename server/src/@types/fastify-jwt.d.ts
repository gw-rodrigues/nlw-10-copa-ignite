import '@fastify/jwt'

/**
 * Importamos a lib
 * Declaramos o module typescript
 * Criamos interface
 * Na interface JWT dizemos quais os nomes do parâmetros que iremos usar e tipo deles.
 */
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
  }
}
