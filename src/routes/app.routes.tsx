import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { Usuario } from "@screens/Usuario";
import { Arquivos } from "@screens/Arquivos";
import { TabBar } from "@components/TabBar";

type AppRoutes = {
    home: undefined;
    arquivos: undefined;
    usuario: undefined;
}
 
export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export const AppRoutes = ( ) => {
    return (
        <Navigator tabBar={props => <TabBar {...props} />} screenOptions={{
            headerShown: false
        }}>
        <Screen name="home" component={Home} />
        <Screen name="arquivos" component={Arquivos} />
        <Screen name="usuario" component={Usuario} />
    </Navigator>
    )
}

