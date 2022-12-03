/**
 * Vamos declarar tipagem global
 * adicionar a nossa Navigation
 *
 * -> quando definimos "undefined" num param significa essa nao tem paramentos, só chamar ela.
 * -> quando uma rota precisa ter params dever definir quais os parâmetros "details: { id: string, name: string }"
 */

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      new: undefined
      polls: undefined
      find: undefined
      details: {
        id: string
      }
    }
  }
}
