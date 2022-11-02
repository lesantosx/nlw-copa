import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading'
import { Signin } from './src/screens/Signin'

import { THEME } from './src/styles/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparente"
        translucent
      />
      {fontsLoaded ? <Signin /> : <Loading />}
    </NativeBaseProvider>    
  );
}  

