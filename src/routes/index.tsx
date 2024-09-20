import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { gluestackUIConfig } from "@gluestack-ui/config";
import { AppRoutes } from "./app.routes";
import { Box } from "@gluestack-ui/themed";

export const Routes = () => {
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