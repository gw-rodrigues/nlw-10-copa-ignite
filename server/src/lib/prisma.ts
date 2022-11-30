/** Vantagem de utilizar prisma, ter inteligencia de auto-complete e ajuda a fazer as queries e utilização das tabelas/models. */
/** import prisma client */ /** Iniciar o prisma client para conectar com database */
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'], //print terminar log todas queries realizadas
})
