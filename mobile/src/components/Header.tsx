import { HStack, Text, Box } from 'native-base'
import { CaretLeft, Export } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import { ButtonIcon } from '../components/ButtonIcon'
interface HeaderProps {
  title: string
  showBackButton?: boolean
  showShareButton?: boolean
  onShare?: () => void
}


export function Header({ title, showBackButton, showShareButton, onShare }: HeaderProps) {
  const navigation = useNavigation()
  const EmptyBox = () => <Box h={6} w={6} />
  return (
    <HStack
      bg='gray.800'
      w='full'
      h={24}
      alignItems='flex-end'
      pb={5}
      px={5}>
      <HStack
        w='full'
        alignItems='center'
        justifyContent='space-between'>
        {
          showBackButton
            ? <ButtonIcon icon={CaretLeft} onPress={() => navigation.navigate('polls')} />
            : <EmptyBox />
        }
        <Text
          fontFamily='medium'
          fontSize='md'
          color='white'>{title}</Text>
        {
          showShareButton
            ? <ButtonIcon icon={Export} onPress={onShare} />
            : <EmptyBox />
        }
      </HStack>
    </HStack>
  )
}