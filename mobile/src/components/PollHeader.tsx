import { Heading, VStack, HStack, Text } from 'native-base'

import { PollProps } from './PollCard'
import { Participants } from './Participants'

interface PollHeaderProps {
  data: PollProps
}

export function PollHeader ({ data }: PollHeaderProps) {
  return (
    <HStack mt={6} mb={4} pb={4} borderBottomWidth={1} borderBottomColor='gray.600' justifyContent='space-between'>
          <VStack>
            <Heading color='white' fontSize='md' fontFamily='heading'>
              {data.title}
            </Heading>
            <Text color='gray.200' fontSize='xs'>
              Código <Text fontFamily='heading'>{data.code}</Text>
            </Text>
          </VStack>
          <Participants
            count={data._count.participants}
            participants={data.participants} />
        </HStack>
  )
}