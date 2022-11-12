import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { VStack, Icon, Text, Box, HStack, Avatar, Center, Heading, FlatList } from 'native-base'
import { MagnifyingGlass } from 'phosphor-react-native'
import { useEffect, useState, useCallback } from 'react'

import { Button } from '../components/Button'
import { EmptyPoolList } from '../components/EmptyPoolList'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { PollCard, PollProps } from '../components/PollCard'
import { api } from '../services/api'

export function Polls () {
  const [polls, setPolls] = useState<PollProps[]>([])
  const [isLoadingPolls, setIsLoadingPolls] = useState(false)
  const { navigate } = useNavigation()
  async function handlePolls () {
    try {
      setIsLoadingPolls(true)
      const response = await api.get('/pools')
      setPolls(response.data)
      setIsLoadingPolls(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingPolls(false)
    }
  }
  useFocusEffect(useCallback(() => {
    handlePolls()
  }, []))
  return (
    <VStack flex={1} bg='gray.900'>
      <Header title='Meus bolões' />
      <VStack mt={6} mx={5} mb={4} pb={4} borderBottomWidth={1} borderBottomColor='gray.600'>
        <Button
          leftIcon={<Icon as={MagnifyingGlass} size='sm' />}
          title='Buscar bolão por código'
          onPress={() => navigate('find') } />
      </VStack>
      {isLoadingPolls 
        ? <Loading />
        : <FlatList
          ListEmptyComponent={() => <EmptyPoolList />}
          px={5}
          data={polls}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <PollCard
              onPress={() => navigate('details', { id: item.id })}
              data={item} />}
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{
            paddingBottom: 10
          }}/>}
    </VStack>
  )
}