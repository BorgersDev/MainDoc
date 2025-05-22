import { Arquivos } from "@screens/Arquivos";
import { TrocarEmpresa } from "@screens/TrocarEmpresa";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Upload } from "@screens/Upload";
import { DocsPorTipo } from "@screens/DocsPorTipo";
import { useAuth } from "@hooks/useAuth";


export type AppRoutes = {
    Arquivos: undefined;
    TrocarEmpresa: undefined;
    Upload: undefined;
    DocsPorTipo: {
        codigoDepartamento: number;
        codigoTipoDocumento: number;
      };
};



export type AppNavigationRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export const AppRoutes = ( ) => {
    const {empresaConfirmada} = useAuth();
    return (
        <Navigator 
        initialRouteName={empresaConfirmada ? 'Arquivos' : 'TrocarEmpresa'}
        screenOptions={{headerShown: false, }}
        >
            <Screen name="Arquivos" component={Arquivos} />
            <Screen name="TrocarEmpresa" component={TrocarEmpresa} />
            <Screen name="Upload" component={Upload} />
            <Screen name="DocsPorTipo" component={DocsPorTipo} />
        </Navigator>
    );
}