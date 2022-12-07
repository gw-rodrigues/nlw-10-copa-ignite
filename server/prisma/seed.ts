/**
 * - PARA SEED FUNCIONAR (adicionar campos/valores nas tabelas/models)precisamos:
 * -> adicionar no package.json seguinte linha:
 *  "prisma" : { "seed" : "tsx prisma/seed.ts" },
 *
 * -> executar:
 *  npx prisma db seed
 *
 */

import { PrismaClient } from '@prisma/client'
/** Para iniciar a conexão. com o prisma, fazemos a importação e iniciamos uma instância na variável. */
const prisma = new PrismaClient()

async function main() {
  /** Para adicionar valores na tabela/model, usamos o await (Promise/ligação externa) seguido do "prisma"."nome-do-model".create({campos do model}) */
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https:///github.com/github.png',
    },
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      /** Podemos também adicionar valores em outras tabelas/models enquanto estamos numa tabela/model especifico (usando método "create") */
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-23T12:00:00Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    },
  })

  await prisma.game.create({
    data: {
      date: '2022-11-23T12:00:00Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          /** Podemos fazer várias cadeias de criação e conexão entre models */
          /** Para fazer relação entre tabela/model entre as chaves "estrangeiras" usamos o "connect" - ("diferente de criar valores") */
          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              },
            },
          },
        },
      },
    },
  })
}

//executar o main para criar os valores
main()
