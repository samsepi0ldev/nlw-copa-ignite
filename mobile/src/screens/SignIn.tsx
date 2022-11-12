import {
  Center,
  Icon,
  Text
} from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'
import { useAuth } from '../lib/auth'

export function SignIn() {
  const { signIn, isUserLoading } = useAuth()
  return (
    <Center
      flex={1}
      bgColor='gray.900'
      p='7'>
      <Logo width={212} height={40} />
      <Button
        marginTop='12'
        title='Entrar com google'
        type='secondary'
        onPress={signIn}
        isLoading={isUserLoading}
        leftIcon={<Icon as={Fontisto} name='google' color='white' size='sm' />} />
      <Text
        color='gray.200'
        textAlign='center'
        fontSize='sm'
        mt='4'>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}