import { Pressable, Center, Text, IPressableProps } from 'native-base'

interface OptionProps extends IPressableProps {
  title: string
  isSelected: boolean
}

export function Option({ title, isSelected, ...rest }: OptionProps) {
  return (
    <Pressable flex={1} h={7} maxH={7} {...rest}>
      <Center w='full' h='full' bg={isSelected ? 'gray.600' : 'transparent'} rounded='sm'>
        <Text color='gray.100' fontFamily='heading' fontSize='xs'>
          {title}
        </Text>
      </Center>
    </Pressable>
  )
}