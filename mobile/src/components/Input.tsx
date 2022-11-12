import { IInputProps, Input as InputNativeBase } from 'native-base'

export function Input ({ ...rest }: IInputProps) {
  return (
    <InputNativeBase
      borderRadius={4}
      borderColor='gray.600'
      bg='gray.800'
      fontSize='md'
      fontFamily='body'
      color='white'
      h={14}
      px={4}
      placeholderTextColor='gray.300'
      _focus={{
        bg: 'gray.800',
        borderColor: 'gray.600'
      }} {...rest} />
  )
}