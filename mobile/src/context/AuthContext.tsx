import { createContext, ReactNode } from 'react'

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextProps {
  user: UserProps
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

//inciamos o context com nossas interfaces
export const AuthContext = createContext({} as AuthContextProps)

//criamos um provider para armazenar conteúdo do AuthContext, e partilhar toda aplicação
// children ??? -> irá ser a nossa app (toda) passada dentro do provider, recebendo as informações
export function AuthContextProvider({ children }: AuthProviderProps) {
  async function signIn() {
    console.log('logged!')
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: 'Gleydson W. Rodrigues',
          avatarUrl: 'https://github.com/gw-rodrigues.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
