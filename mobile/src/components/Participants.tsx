import { Avatar, HStack, Center, Text } from "native-base"

export interface ParticipantsProps {
  id: string
  user: {
    avatar: string
  }
}

interface Props {
  participants: ParticipantsProps[]
  count: number
}

export function Participants({ participants, count }: Props) {
  return (
    <HStack>
      {participants.map(participant => (
        <Avatar
          key={participant.id}
          source={{ uri: participant.user.avatar }}
          w={8}
          h={8}
          rounded='full'
          borderWidth={2}
          borderColor='gray.800'
          marginRight={-3} />
      ))}
      <Center
        w={8}
        h={8}
        bg='gray.700'
        borderWidth={2}
        borderColor='gray.800'
        rounded='full'>
        <Text
          fontFamily='medium'
          color='gray.100'
          fontSize='xs'>{count ? `+${count}` : 0}</Text>
      </Center>
    </HStack>
  )
}