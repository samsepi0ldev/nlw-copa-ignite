import { Heading, VStack, HStack, Text, useTheme, Button } from 'native-base'
import { X, Check } from 'phosphor-react-native'
import { getName } from 'country-list'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Team } from './Team'

interface GuessesProps {
  id: string
  firstTeamPoints: number
  secondTeamPoints: number
  createdAt: Date
  gameId: string,
  participantId: string
}

export interface GameProps {
  id: string
  date: Date
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  guess: GuessesProps | null
}

interface Props {
  data: GameProps
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
  onGuessConfirm: () => void
}

export function Game ({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm }: Props) {
  const { sizes, colors } = useTheme()
  const date = format(new Date(data.date), "d 'de' MMMM 'de' yyyy 'às' hh:mm'h'", { locale: ptBR })
  return (
    <VStack
      bg='gray.800'
      alignItems='center'
      w='full'
      p={4}
      mb={3}
      rounded='sm'
      borderBottomWidth={2}
      borderBottomColor='yellow.500'>
      <Text color='gray.100' fontFamily='heading' fontSize='md'>
        {getName(data.firstTeamCountryCode)} vs. {getName(data.secondTeamCountryCode)}
      </Text>
      <Text color='gray.200' fontSize='xs'>
        {date}
      </Text>
      <HStack mt={4} justifyContent='space-between' w='full' alignItems='center'>
        <Team
          code={data.firstTeamCountryCode}
          position='right'
          onChangeText={setFirstTeamPoints} />
        <X color={colors.gray[300]} size={sizes[6]} />
        <Team
          code={data.secondTeamCountryCode}
          position='left'
          onChangeText={setSecondTeamPoints} />
      </HStack>
      {!data.guess ? 
        new Date(data.date) < new Date()
        ? <Button size="xs" w="full" bgColor="gray.600" mt={4}>
            <HStack alignItems="center">
              <Text textTransform='uppercase' color="gray.300" fontSize="xs" fontFamily="heading" mr={3}>
                Tempo esgotado
              </Text>
            </HStack>
          </Button>
        : <Button onPress={onGuessConfirm} size="xs" w="full" bgColor="green.500" mt={4}>
            <HStack alignItems="center">
              <Text textTransform='uppercase' color="white" fontSize="xs" fontFamily="heading" mr={3}>
                Confirmar palpite
              </Text>
              <Check color={colors.white} size={sizes[4]} />
            </HStack>
          </Button>
        : null}
    </VStack>
  )
}