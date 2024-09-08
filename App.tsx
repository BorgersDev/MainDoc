import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold
} from "@expo-google-fonts/karla"

import { Center, GluestackUIProvider, Text } from "@gluestack-ui/themed"

import { config } from "./config/gluestack-ui.config"
import { Loading } from '@components/Loading';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';


export default function App() {
  const [fontsLoaded] = useFonts({Karla_400Regular, Karla_700Bold})

  return (
    <GluestackUIProvider config={config} >

      <Center flex={1}>
        {fontsLoaded ? <SignUp /> : <Loading />}
        <StatusBar style="auto" />
      </Center>
    </GluestackUIProvider>
  );
}

