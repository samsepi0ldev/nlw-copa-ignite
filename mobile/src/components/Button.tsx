import {
  Button as NativeBaseButton,
  Text,
  IButtonProps
} from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  type?: 'primary' | 'secondary'
}

export function Button({
  title,
  type = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <NativeBaseButton
      w='full'
      h={14}
      bg={type === 'secondary' ? 'red.500' : 'yellow.500'}
      rounded='sm'
      fontSize='md'
      _pressed={{
        bg: type === 'secondary' ? 'red.600' : 'yellow.600'
      }}
      _loading={{
        bg: type === 'secondary' ? 'red.600:alpha.70' : 'yellow.600:alpha.70'
      }}
      _spinner={{
        color: 'white'
      }}
      {...rest}>
      <Text
        fontSize='sm'
        textTransform='uppercase'
        color={type === 'secondary' ? 'white' : 'black'}
        fontFamily='heading'
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}