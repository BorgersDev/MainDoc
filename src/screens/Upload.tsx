import { useEffect, useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Box } from "@/components/ui/box";
import DropdownComponent from "@components/DropdownComponent";
import * as DocumentPicker from "expo-document-picker";
import { AppError } from "@utils/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@components/ToastMessage";
import { api } from "@services/api";
import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";



export const Upload = () => {
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const toast = useToast();
  const [departamentos, setDepartamentos] = useState([]);
  const [ selectedDepartment, setSelectedDepartment ] = useState<number | null>(null);
  const [tipoDocumento, setTipoDocumento] = useState([]);

  const openFileOptions = () => {
    Alert.alert( 'Selecionar arquivo', 'Escolha a origem do documento', [
      {
        text: 'Digitalizar',
        onPress: pickFromCamera,
      },
      {
        text: 'Fototeca',
        onPress: pickFromGallery,
      },
      {
        text: 'Arquivos',
        onPress: pickFromFiles,
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  }
  const pickFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setSelectedFile(image)
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true, 
      base64: true,
    });
    if (!result.canceled) {
      const files = result.assets;
      setSelectedFile(files);
    }
  }
  const pickFromFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });
    if(!result.canceled) {
      const file = result.assets[0];
      setSelectedFile(file);
    }
  }

  const fetchDepartamentos = async () => {
    try {
      const response = await api.get(`/departamento/listar`);
      const data = response.data
      setDepartamentos(data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = "Não foi possível carregar os departamentos";
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
      
    }
  }
  const handleDepartamentoChange = (item: { codigo: number; nome: string }) => {
  setSelectedDepartment(item.codigo);
  fetchTipoDocumento(item.codigo);
};
  const fetchTipoDocumento = async () => {
    if (!selectedDepartment) return;
    try {
      const response = await api.get(`/tipoDocumento/listar/${selectedDepartment}`);
      const data = response.data;
      setTipoDocumento(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = "Não foi possível carregar os tipos de documento";
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
      
    }
  }

  const fetchIndicesPorTipoDocumento = async (tipoDocumentoId: number) => {
    try {
      const response = await api.get(`/tipoDocumento/obter/${tipoDocumentoId}`);
      const data = response.data;
      console.log("Indices do tipo de documento:", data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = "Não foi possível carregar os índices do tipo de documento";
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
      
    }
    
  }

useEffect(() => {
  fetchTipoDocumento();
}, [selectedDepartment]);


  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <VStack className="flex-1">
        <HStack className="pr-6 justify-end">
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <HStack className="gap-1">
              <Feather name="x" size={24} color={"#9F9BA1"} />
            </HStack>
          </TouchableOpacity>
        </HStack>

        <VStack className="flex-1 items-center gap-4">
          {/* Upload Box */}
          <Box
            className="mt-[7%] w-[90%] min-h-[40%] bg-gray-200 rounded-2xl p-4 shadow-md"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -1 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            }}
          >
            <VStack className=" flex-1 w-full gap-2">
              <DropdownComponent name="Departamento" data={departamentos} fetch={fetchDepartamentos} onChange={(item) => setSelectedDepartment(item.codigo)} />
              <DropdownComponent name="Tipo documento" data={tipoDocumento} fetch={fetchTipoDocumento} onChange={(item) => fetchIndicesPorTipoDocumento(item.codigo)} />
            </VStack>

            <VStack className=" flex-1 w-full justify-center items-center">
            
            {/* {!selectedFile ? (
            <TouchableOpacity className="w-[90%] flex-1" onPress={pickDocument}>
              <Box className="justify-center items-center flex-1 border-2 border-dashed border-blueGray-400 rounded-2xl p-4">
                <Feather name="upload" size={30} color={"#075985"} />
                <Text className="font-heading text-lightBlue-800">Adicionar arquivo</Text>
              </Box>
            </TouchableOpacity>)
            : (
              <Box className="mt-15 mx-2 p-2 bg-gray-300 rounded-lg flex-row items-center">
                <Feather name="file" size={22} color={"#075985"} />
                <Text className="ml-2 text-gray-700">{selectedFile.name}</Text>
              </Box>
            )} */}
            </VStack>
          </Box>

          <Box
            className="w-[90%] h-[45%] bg-gray-200 rounded-2xl shadow-md"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 9,
            }}
          >

          </Box>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};
