import Head from 'next/head'
import Image from 'next/image'
import { FormEvent } from 'react'

import logo from '../assets/logo.svg'
import appPreviewImg from '../assets/aplicacao-trilha-ignite.png'
import avatares from '../assets/avatares.png'
import checkImg from '../assets/check.svg'
import { api } from '../lib/axios'

interface HomeProps {
  userCount: number
  poolCount: number
  guessCount: number
}

export default function Home({ userCount, guessCount, poolCount }: HomeProps) {
  async function createPool (e: FormEvent) {
    e.preventDefault()
    const formElm = e.target as HTMLFormElement
    const data = Object.fromEntries(new FormData(formElm))
    try {
      const res = await api.post('/pools', data)
      await navigator.clipboard.writeText(res.data.code)
      alert('Código do bolão copiado para area de transferência! Compartilhe o código com CTRL+V')
    } catch (error) {
      console.log(error)
    }
    formElm.reset()
  }
  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main >
        <Image className='mb-14' src={logo} alt='Logo nlw Copa' />
        <div className='flex flex-col gap-10'>
          <h1 className='font-bold text-5xl text-white leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
          <div className='font-bold text-gray-100 flex items-center gap-2'>
            <Image src={avatares} alt='Imagem dos avatares dos usuários do nlw Copa' />
            <span><span className='text-green-500'>+{userCount}</span> pessoas já estão usando</span>
          </div>
          <form onSubmit={createPool} className='flex flex-col gap-4 text-sm'>
            <div className='flex gap-2'>
              <input
                className='rounded px-6 py-4 bg-gray-800 border border-gray-600 text-white flex-1'
                type='text'
                name='title'
                placeholder='Qual nome do seu bolão?' />
              <button
                className='rounded px-6 py-4 text-gray-950 bg-yellow-500 hover:bg-yellow-400 font-bold uppercase'
              >Criar meu bolão</button>
            </div>
            <p className='text-gray-300 leading-relaxed'>
              Após criar seu bolão, você receberá um código único que {'\n\r'}
              poderá usar para convidar outras pessoas 🚀
            </p>
          </form>
          <div className='border-t border-gray-600 flex items-center justify-between pt-10'>
            <div className='flex items-center gap-6'>
              <Image src={checkImg} alt='Imagem de check' />
              <div className='flex flex-col gap-[2px] text-gray-100'>
                <span className='text-2xl font-bold'>+{poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>
            <span className='flex w-px h-14 bg-gray-600'></span>
            <div className='flex items-center gap-6'>
              <Image src={checkImg} alt='Imagem de check' />
              <div className='flex flex-col gap-[2px] text-gray-100'>
                <span className='text-2xl font-bold'>+{guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt='Preview da aplicação móvel do nlw Copa.' />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [
    userCountResponse,
    poolCountResponse,
    guessCountResponse
  ] = await Promise.all([
    api.get('/users/count'),
    api.get('/pools/count'),
    api.get('/guesses/count')
  ])
  return {
    props: {
      userCount: userCountResponse.data.count,
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count
    }
  }
}
