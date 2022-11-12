import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
  Roboto_500Medium
} from '@expo-google-fonts/roboto';
import {
  NativeBaseProvider,
  StatusBar,
} from 'native-base'

import { THEME } from './src/themes/theme'
import { Loading } from './src/components/Loading'
import { AuthContextProvider } from './src/lib/auth'
import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
    Roboto_500Medium
  })
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        {!fontsLoaded ? <Loading /> : <Routes />}
        <StatusBar
            backgroundColor='transparent'
            barStyle='light-content'
            translucent />
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}