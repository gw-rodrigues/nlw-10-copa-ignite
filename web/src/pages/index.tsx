/**
 * Instalação do Tailwind
 *
 * -> npm install -D tailwindcss postcss autoprefixer
 *
 * Criar arquivo configuração
 *  -> npx tailwindcss init -p
 *
 * no Tailwind.config.js adicionar seguinte linha:
 */
//  -> content: ["./src/**/*.tsx"],
/**
 *  Para adicionar estilos globais como font, etc. Podemos criar nossas cores e estilos
 *
 *  -> fontFamily: { sans: 'Roboto, sans-serif', },
 *  -> colors: { gray: { 900: '#121214' } },
 *
 * na pasta styles adicionar um ficheiro global.css
 *
 *   -> @tailwind base; @tailwind utilities; @tailwind components;
 */

/**
 * Para adicionar/alterar o ficheiro com html, head, body no nextjs, precisamos criar um ficheiro com nome:
 *  -> _document.tsx
 * 
 * com a seguinte configuração básica:
 * 
  import { Html, Head, Main, NextScript } from 'next/document'

  export default function Document() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
 */

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { api } from '../lib/axios'

import appPreviewImage from '../assets/app-preview.png'
import logoImage from '../assets/logo.svg'
import userAvatarImage from '../assets/avatares.png'
import iconCheckImage from '../assets/icon-check.svg'

interface HomeProps {
  poolsCount: number
  guessesCount: number
  usersCount: number
}
export default function Home({
  poolsCount,
  guessesCount,
  usersCount,
}: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/polls', {
        title: poolTitle,
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)
      alert('Bet created with success, code copied to clipboard.')

      setPoolTitle('')
    } catch (error) {
      console.log(error)
      alert('Fail to create bet, try again!')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid gap-28 grid-cols-2 items-center">
      <main>
        <Image src={logoImage} alt="NLW Copa" />
        <h1 className="text-5xl font-bold leading-tight text-white mt-14">
          Create your own bet and share with your friends!
        </h1>

        <div className="flex items-center gap-2 mt-10">
          <Image src={userAvatarImage} alt="" />
          <strong className="text-xl text-gray-100">
            <span className="text-ignite-500">+{usersCount}</span> peoples are
            already using
          </strong>
        </div>

        <form onSubmit={createPool} className="flex gap-2 mt-10">
          <input
            className="flex-1 px-6 py-4 text-sm text-gray-100 bg-gray-800 border border-gray-600 rounded"
            type="text"
            required
            placeholder="What is the name of your bet?"
            value={poolTitle}
            onChange={(event) => setPoolTitle(event.target.value)}
          />
          <button className="px-6 py-4 bg-yellow-500 rounded">
            Create your bet
          </button>
        </form>

        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          After creating your bet, you will receive a unique code that you can
          use to invite others peoples 🚀
        </p>

        <div className="flex items-center justify-between pt-10 mt-10 text-gray-100 border-t border-gray-600">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt="" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{poolsCount}</span>
              <span>Created Bets</span>
            </div>
          </div>
          <div className="w-px bg-gray-600 h-14" />
          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt="" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{guessesCount}</span>
              <span>Guesses sent</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImage}
        alt="showing two cellphones with showcase of the app"
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolsCountResponse, guessesCountResponse, usersCountResponse] =
    await Promise.all([
      api.get('polls/count'),
      api.get('guesses/count'),
      api.get('users/count'),
    ])

  return {
    props: {
      poolsCount: poolsCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
  }
}
