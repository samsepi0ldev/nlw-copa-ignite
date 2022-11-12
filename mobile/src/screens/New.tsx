import { useState } from 'react'
import { VStack, Icon, Text, useToast } from 'native-base'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import Logo from '../assets/logo.svg'
import { Input } from '../components/Input'
import { api } from '../services/api'

export function New () {
  const [title, setTitle] = useState('')
  const [isLoadingCreatePoll, setIsLoadingCreatePoll] = useState(false)
  const toast = useToast()
  async function createPoll () {
    try {
      setIsLoadingCreatePoll(true)
      if (!title.trim()) {
        return toast.show({
          placement: 'top',
          title: 'Informe o nome ao seu bolão.',
          bg: 'red.500'
        })
      }
      await api.post('/pools', { title })
      toast.show({
        placement: 'top',
        title: 'Bolão cadastrado com sucesso!',
        bg: 'green.500'
      })
    } catch (error) {
      console.error(error)
      toast.show({
        placement: 'top',
        title: 'Houve um erro ao cadastrar bolão.',
        bg: 'red.500'
      })
    } finally {
      setIsLoadingCreatePoll(false)
      setTitle('')
    }
  }
  return (
    <VStack flex={1} bg='gray.900'>
      <Header title='Criar novo bolão' />
      <VStack mt={8} mx={5} mb={4} pb={4} borderBottomWidth={1} borderBottomColor='gray.600'>
        <Icon as={Logo} mx='auto' mb={8} />
        <Text
          color='white'
          textAlign='center'
          fontSize='xl'
          fontFamily='heading'
          mb={8}>
          Crie seu próprio bolão da copa{'\n'}e compartilhe entre amigos!
        </Text>
        <Input
          onChangeText={text => setTitle(text)}
          value={title}
          placeholder='Qual nome do seu bolão?'
          mb={2} />
        <Button
          onPress={createPoll}
          title='Criar meu bolão'
          isLoading={isLoadingCreatePoll} />
      </VStack>
      <Text color='gray.200' textAlign='center' fontSize='sm'>
        Após criar seu bolão, você receberá um{'\n'} código único que poderá usar para convidar{'\n'} outras pessoas.
      </Text>
    </VStack>
  )
}