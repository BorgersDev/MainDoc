
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { Box, useTheme } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "@gluestack-ui/config";
import { Loading } from "@components/Loading";
import { useLoading } from "@hooks/useLoading";


export const Routes = () => {

    const {colors} = useTheme();

    const { user } = useAuth();

    const {isLoading} = useLoading();

    console.log('USUÁRIO LOGADO =>', user)

    const theme = DefaultTheme
    theme.colors.background = gluestackUIConfig.tokens.colors.warmGray100
    
    if(isLoading) {
        return <Loading />
    }

    return (
        <Box flex={1} bg="$gray100" >  
        <NavigationContainer theme={theme} > 
            { user !== null && user.nome ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
        </Box>
    )
}