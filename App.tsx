import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold
} from "@expo-google-fonts/karla"

import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "./config/gluestack-ui.config"

import { Routes } from './src/routes';

import { Loading } from '@components/Loading';

import { AuthContext, AuthContextProvider } from '@contexts/AuthContext';
import { NavigationProvider } from '@contexts/NavigationContext';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NavigationProvider>
      <GluestackUIProvider config={config}>
        <AuthContextProvider>
              {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </NavigationProvider>
  );
}
