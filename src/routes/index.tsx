import { useContext } from "react";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AuthContext } from "@contexts/AuthContext";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { Box } from "@gluestack-ui/themed";
import { gluestackUIConfig } from "@gluestack-ui/config";


export const Routes = () => {

    const contextData = useContext( AuthContext );
    console.log('USUÁRIO LOGADO =>', contextData)

    const theme = DefaultTheme
    theme.colors.background = gluestackUIConfig.tokens.colors.warmGray100


    return (
        <Box flex={1} bg="$gray100" >  
        <NavigationContainer theme={theme} > 
            <AuthRoutes />
        </NavigationContainer>
        </Box>
    )
}