import {
  VStack,
  Text,
  HStack,
  Avatar,
  Center,
  Heading
} from 'native-base'
import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Participants } from './Participants'

interface Participants {
  id: string
  user: {
    avatar: string
  }
}
export interface PollProps {
  id: string
  title: string
  code: string
  createdAt: Date
  ownerId: string
  owner: {
    id: string
    name: string
  },
  participants: Participants[]
  _count: {
    participants: number
  }
}

interface Props extends TouchableOpacityProps {
  data: PollProps
}

export function PollCard({ data, ...rest}: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
      w='full'
      h={20}
      rounded='sm'
      bg='gray.800'
      p={4}
      mb={3}
      justifyContent='space-between'
      alignItems='center'
      borderBottomWidth={2}
      borderBottomColor='yellow.500'>
      <VStack>
        <Heading color='white' fontFamily='heading' fontSize='md'>
          {data.title}
        </Heading>
        <Text color='gray.200' fontSize='xs'>
          {data.owner.name}
        </Text>
      </VStack>
      <Participants
        participants={data.participants}
        count={data._count.participants} />
    </HStack>
    </TouchableOpacity>
  )
}