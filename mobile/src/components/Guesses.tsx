import { FlatList, Toast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

import { GameProps, Game } from './Game'
import { Loading } from './Loading'
import { EmptyMyPollList } from './EmptyMyPollList'


interface Props {
  pollId: string
  code: string
}

export function Guesses ({ pollId, code }: Props) {
  const [games, setGames] = useState<GameProps[]>([])
  const [isLoadingGame, setIsLoadingGame] = useState(true)
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  async function fetchGames () {
    try {
      setIsLoadingGame(true)
      const response = await api.get(`/pools/${pollId}/games`)
      setGames(response.data)
    } catch (error) {
      Toast.show({
        title: 'Houve um erro ao carregar jogos',
        placement: 'top',
        bg: 'red.500',
      })
    } finally {
      setIsLoadingGame(false)
    }
  }

  async function handlerGuessesConfirm (gameId: string) {
    try {
      await api.post(`/pools/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })
      Toast.show({
        title: 'Palpite criado com sucesso!',
        placement: 'top',
        bg: 'green.500'
      })
      fetchGames()
    } catch (error) {
      console.error(error)
      Toast.show({
        title: 'Ocorreu um error',
        placement: 'top',
        bg: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGames()
  }, [pollId])

  if (isLoadingGame) return <Loading />
  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handlerGuessesConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPollList code={code} />} />
  )
}