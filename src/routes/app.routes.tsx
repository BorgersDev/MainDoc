import { Arquivos } from "@screens/Arquivos";
import { TrocarEmpresa } from "@screens/TrocarEmpresa";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";


type AppRoutes = {
    Arquivos: undefined;
    TrocarEmpresa: undefined;
};



export type AppNavigationRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export const AppRoutes = ( ) => {
    return (
        <Navigator screenOptions={{
            headerShown: false
        }}>
        <Screen name="Arquivos" component={Arquivos} />
        <Screen name="TrocarEmpresa" component={TrocarEmpresa} />
    </Navigator>
    )
}