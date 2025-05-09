
import { useTheme } from "@gluestack-ui/themed";
import { Box } from "@/components/ui/box";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { gluestackUIConfig } from "@gluestack-ui/config";
import { Loading } from "@components/Loading";
import { useLoading } from "@hooks/useLoading";


export const Routes = () => {

    const {colors} = useTheme();

    const { user } = useAuth();

    const {isLoading} = useLoading();


    const theme = DefaultTheme
    theme.colors.background = gluestackUIConfig.tokens.colors.warmGray100
    
    if(isLoading) {
        return <Loading />
    }
    console.log('USER ===> ',user)
    return (
        <Box className="flex-1 bg-gray-100">
            <NavigationContainer theme={theme} > 
                { user !== null && user.nome ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    );
}