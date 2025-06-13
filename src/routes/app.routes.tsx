import { Arquivos } from "@screens/Arquivos";
import { TrocarEmpresa } from "@screens/TrocarEmpresa";
import { SelecionarEmpresa } from "@screens/SelecionarEmpresa";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Upload } from "@screens/Upload";
import { DocsPorTipo } from "@screens/DocsPorTipo";
import { useAuth } from "@hooks/useAuth";
import { VisualizarDocumento } from "@screens/VisualizarDocumento";


export type AppRoutes = {
    Arquivos: undefined;
    TrocarEmpresa: undefined;
    SelecionarEmpresa: undefined;
    Upload: undefined;
    DocsPorTipo: {
        codigoDepartamento: number;
        codigoTipoDocumento: number;
      };
    "VisualizarDocumento": 
  | { url: string; name: string }
  | { images: { uri: string }[]; name: string }
  | { mediaUri: string; mimeType: string; name: string };
};



export type AppNavigationRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export const AppRoutes = ( ) => {
    const {empresaConfirmada} = useAuth();
   
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {!empresaConfirmada ? (
        <Screen name="SelecionarEmpresa" component={SelecionarEmpresa} />
      ) : (
        <>
          <Screen name="Arquivos" component={Arquivos} />
          <Screen name="Upload" component={Upload} />
          <Screen name="DocsPorTipo" component={DocsPorTipo} />
          <Screen name="VisualizarDocumento" component={VisualizarDocumento} />
          <Screen name="TrocarEmpresa" component={TrocarEmpresa} />
        </>
      )}
    </Navigator>
  );
};