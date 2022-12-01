import { FastifyRequest } from 'fastify'

/**
 *  Como vamos fazer várias vezes a verificação do user com JWT token vamos criar esse ficheiro
 *
 *  !!! Como noa estamos criar um route, então nao vamos user "FastifyInstance"
 *  -> vamos user o "FastifyRequest" - porque queremos user dentro de uma rota especifica para validar user.
 */
export async function authenticate(request: FastifyRequest) {
  //JWT verifica na headers se existe token e se é válido
  await request.jwtVerify()
}
