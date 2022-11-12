import { VStack, Text, Toast } from 'native-base'

import { Button } from '../components/Button'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { api } from '../services/api'
import { useState } from 'react'

export function Find () {
  const [isLoadingJoinPoll, setIsLoadingJoinPoll] = useState(false)
  const [code, setCode] = useState('')
  async function joinToPoll () {
    try {
      setIsLoadingJoinPoll(true)
      await api.post('/pools/join', { code: code.toUpperCase() })
      Toast.show({
        title: 'Voce se junto ao bolão',
        bg: 'green.500',
        placement: 'top'
      })
    } catch (error: any) {
      console.error(error)
      Toast.show({
        title: error.response.data.error,
        bg: 'red.500',
        placement: 'top'
      })
    } finally {
      setIsLoadingJoinPoll(false)
    }
  }
  return (
    <VStack flex={1} bg='gray.900'>
      <Header showBackButton title='Buscar por código' />
      <VStack mt={8} mx={5} mb={4} pb={4}>
        <Text
          color='white'
          textAlign='center'
          fontSize='xl'
          fontFamily='heading'
          mb={8}>
          Encontre um bolão através de {'\n'}seu código único
        </Text>
        <Input
          autoCapitalize='characters'
          onChangeText={value => setCode(value)}
          value={code}
          placeholder='Qual o código do bolão?'
          mb={2} />
        <Button
          onPress={joinToPoll}
          title='Buscar bolão'
          isLoading={isLoadingJoinPoll} />
      </VStack>
    </VStack>
  )
}