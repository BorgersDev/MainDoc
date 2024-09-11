import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { Usuario } from "@screens/Usuario";
import { Arquivos } from "@screens/Arquivos";
import { TabBar } from "@components/TabBar";

type AppRoutes = {
    Home: undefined;
    Arquivos: undefined;
    Usuário: undefined;
}
 
export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export const AppRoutes = ( ) => {
    return (
        <Navigator tabBar={props => <TabBar {...props} />} screenOptions={{
            headerShown: false
        }}>
        <Screen name="Home" component={Home} />
        <Screen name="Arquivos" component={Arquivos} />
        <Screen name="Usuário" component={Usuario} />
    </Navigator>
    )
}

