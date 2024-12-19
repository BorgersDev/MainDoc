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
import { LoadingContextProvider } from '@contexts/LoadingContext';

import { useLoading } from '@hooks/useLoading';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  const {isLoading, setLoading} = useLoading()

  const fontloaded = () => {
    {fontsLoaded ? setLoading(false) : setLoading(true)}
  }
 
  return (
    <NavigationProvider>
      <GluestackUIProvider config={config}>
        <LoadingContextProvider>
          <AuthContextProvider>
              { isLoading ? <Loading /> : <Routes /> }
          </AuthContextProvider>
        </LoadingContextProvider>
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </NavigationProvider>
  );
}
