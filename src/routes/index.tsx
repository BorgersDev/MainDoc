import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { gluestackUIConfig } from "@gluestack-ui/config";

export const Routes = () => {
    const theme = DefaultTheme
    theme.colors.background = gluestackUIConfig.tokens.colors.warmGray700
    return (
        <NavigationContainer theme={theme} > 
            <AuthRoutes />
        </NavigationContainer>
    )
}