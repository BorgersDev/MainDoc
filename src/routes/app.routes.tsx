import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { Usuario } from "@screens/Usuario";
import { Arquivos } from "@screens/Arquivos";
import { TabBar } from "@components/TabBar";
import { Departamento } from "@screens/Departamento";
import { Empresa } from "@screens/Empresa";
import { Licenca } from "@screens/Licenca";
import { TipoDeDocumento } from "@screens/TipoDeDocumento";
import { Lixeira } from "@screens/Lixeira";
import { PerfilDeUsuario } from "@screens/PerfilDeUsuario";

type AppRoutes = {
    Home: undefined;
    Arquivos: undefined;
    Usuário: undefined;
    Departamento: undefined;
    Empresa: undefined;
    Licenca: undefined;
    TipoDeDocumento: undefined;
    Lixeira: undefined;
    PerfilDeUsuario: undefined;
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
        <Screen name="Usuário" options={{ headerShown: true }} component={Usuario} />
        <Screen name="Departamento" component={Departamento} />
        <Screen name="Empresa" component={Empresa} />
        <Screen name="Licenca" component={Licenca} />
        <Screen name="TipoDeDocumento" component={TipoDeDocumento} />
        <Screen name="Lixeira" component={Lixeira} />
        <Screen name="PerfilDeUsuario" component={PerfilDeUsuario} />

    </Navigator>
    )
}

