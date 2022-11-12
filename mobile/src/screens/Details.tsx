import { useRoute } from '@react-navigation/native'
import { VStack, HStack, Toast } from 'native-base'
import { useEffect, useState } from 'react'
import { Share } from 'react-native'

import { Header } from '../components/Header'
import { Option } from '../components/Option'
import { PollHeader } from '../components/PollHeader'
import { PollProps } from '../components/PollCard'
import { api } from '../services/api'
import { EmptyMyPollList } from '../components/EmptyMyPollList'
import { Guesses } from '../components/Guesses'


interface ParamsProps {
  id: string
}

export function Details () {
  
  const [poll, setPoll] = useState<PollProps>({} as PollProps)
  const [isLoadingPoll, setIsLoadingPoll] = useState(true)
  const [isSelectedOption, setIsSelectedOption] = useState('guesses')
  const route = useRoute()
  const { id } = route.params as ParamsProps
  
  async function fetchPollDetails () {
    try {
      setIsLoadingPoll(true)
      const response = await api.get(`/pools/${id}`)
      setPoll(response.data)
    } catch (error) {
      Toast.show({
        title: 'Houve um erro ao carregar bolão.',
        bg: 'red.500',
        placement: 'top'
      })
    } finally {
      setIsLoadingPoll(false)
    }
  }
  useEffect(() => {
    fetchPollDetails()
  }, [id])

  async function handleCodeShare () {
    await Share.share({
      message: poll.code
    })
  }

  return (
    <VStack flex={1} bg='gray.900'>
      <Header
        showBackButton
        showShareButton
        onShare={handleCodeShare}
        title={poll.title} />
        {poll._count?.participants > 0
          ? <VStack flex={1} px={5}>
              <PollHeader data={poll} />
              <HStack bg='gray.800' p={1} mb={5} rounded='sm'>
                <Option
                  onPress={() => setIsSelectedOption('guesses')}
                  title='Seus palpites'
                  isSelected={isSelectedOption === 'guesses'} />
                <Option
                  onPress={() => setIsSelectedOption('ranking')}
                  title='Ranking do grupo'
                  isSelected={isSelectedOption === 'ranking'} />
              </HStack>
              <Guesses code={poll.code} pollId={poll.id} />
            </VStack>
          : <EmptyMyPollList code={poll.code} />}
    </VStack>
  )
}