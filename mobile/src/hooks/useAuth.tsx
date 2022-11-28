/**
 * Porque criação desse hook?
 *
 * -> para nao ficar a criar, importando sempre o useContext, assim apenas usamos
 * -> o useAuth que retorna o Auth context para aplicação com as informações
 */

import { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)
  return context
}
