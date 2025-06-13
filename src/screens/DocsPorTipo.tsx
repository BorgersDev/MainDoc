import { VStack } from "@/components/ui/vstack";
import { Header } from "@components/Header";
import { DocumentCard } from "@components/DocumentCard";
import { Fab, FabLabel, FabIcon } from '@/components/ui/fab';
import { AddIcon } from "@/components/ui/icon";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRoutesProps, AppRoutes } from "@routes/app.routes";
import { FlatList, TouchableOpacity } from "react-native";
import { Departamentos } from "@components/Departamentos";
import { Feather } from "@expo/vector-icons"
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@components/ToastMessage";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import { DocumentoDTO } from "@dtos/DocumentoDTO";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { set } from "@gluestack-style/react";

type DocsPorTipoRouteProps = RouteProp<AppRoutes, 'DocsPorTipo'>;

export const DocsPorTipo = () => {
  const route = useRoute<DocsPorTipoRouteProps>();
  const toast = useToast();
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const [selectedDepartment, setSelectedDepartment] = useState('RH')
  const [documentos, setDocumentos] = useState<DocumentoDTO[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const codigoDepartamento = route.params.codigoDepartamento
  const codigoTipoDocumento = route.params.codigoTipoDocumento
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);


  const fetchDocumentos= async (isLoadMore = false) => {
    if ( isLoading ) return;

    try {
      setIsLoading(true);

      const currentPage = isLoadMore ? page + 1 : 1;


      const response = await api.get(`/arquivo/listar/${codigoDepartamento}/${codigoTipoDocumento}/10/${currentPage}`, {
        headers: {
          filtroBusca: searchQuery
        }
      })
      const data = response.data.list
    
      if (isLoadMore) {
        setDocumentos((prev) => [...prev, ...data]);
        setPage(currentPage);
      } else {
        setDocumentos(data);
        setPage(1);
      }

      if(data.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title =  "Não foi possível carregar os Tipos de Documento "
      toast.show({
              placement: "top",
              render: ({ id }) => (
                <ToastMessage
                  id={id}
                  title={title}
                  onClose={() => toast.close(id)}
                  action="error"
                />
              ),
            });
            
    } finally {
      setIsLoading(false);
    }
  }   
  const handleVisualizar = async (
    id: number,
    name: string,
    extensao: string,
  ) => {
    try {
      const response = await api.get(`/arquivo/url/${id}`, {
        headers: {
          filtroBusca: ''
        }
      })
      const url = response.data.url;
      const ext = extensao.toLowerCase();
      const mimeMap: Record<string, string> = {
        pdf: 'application/pdf',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        mp4: 'video/mp4',
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
      };
      const mimeType = mimeMap[ext] || '';
      navigator.navigate('VisualizarDocumento', { url, name, mimeType });
      
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title =  "Não foi possível visualizar o documento "
      toast.show({
              placement: "top",
              render: ({ id }) => (
                <ToastMessage
                  id={id}
                  title={title}
                  onClose={() => toast.close(id)}
                  action="error"
                />
              ),
            });
      
    }
  }

  const handleDownload = async (id: number, fileName: string, extensao: string) => {
    try {
      const response = await api.get(`/arquivo/download/${id}`, {
        headers: {
          filtroBusca: ''
        }
      });
  
      const base64 = response.data.file as string;
      if (!base64) {
        toast.show({
          placement: 'top',
          render: ({ id }) => (
            <ToastMessage
              id={id}
              title={'Arquivo inválido para download.'}
              onClose={() => toast.close(id)}
              action="error"
            />
          )
        });
        return;
      }
  
      const fileUri = `${FileSystem.documentDirectory}${fileName}.${extensao}`;
  
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const canShare = await Sharing.isAvailableAsync();
  
      if (canShare) {
        await Sharing.shareAsync(fileUri);
      } else {
        toast.show({
          placement: 'top',
          render: ({ id }) => (
            <ToastMessage
              id={id}
              title={'Arquivo salvo no dispositivo.'}
              onClose={() => toast.close(id)}
              action="success"
            />
          )
        });
      }
  
    } catch (error) {
      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={'Não foi possível fazer o download do arquivo.'}
            onClose={() => toast.close(id)}
            action="error"
          />
        )
      });
    }
  };

  useEffect(() => {
    setDocumentos([])
    setPage(1)
    setHasMore(true)
    fetchDocumentos();
  }, [codigoTipoDocumento, codigoDepartamento, searchQuery])
  // useEffect(() => {
  //   setDocumentos([]);
  //   setPage(1);
  //   setHasMore(true);
  // }, [codigoTipoDocumento, codigoDepartamento, searchQuery]);

  return (
    <VStack className="flex-1 bg-gray-200 mt-[14%]">
      <Header GoBack={true} InputValue={searchQuery} setInputValue={setSearchQuery} />
      <Card className="w-[100%] h-[7%] justify-center bg-blue-800 rounded-xs mb-1">
              <HStack className="gap-4 ml-5  items-center justify-space-between">
                <Center className="w-[10%]">
                  <Text className="font-heading text-gray-100 text-xs">ID</Text>
                </Center>
                <Center className="w-[45%]">
                  <Text className="font-heading text-gray-100 text-xs">NOME</Text>
                </Center>
                <Center className="w-[45%]">
                  <Text className="font-heading text-gray-100 text-xs">OPÇÕES</Text>
                </Center>
              </HStack>
            </Card>
      { documentos.length === 0 ? <Text className="text-gray-500 text-center mt-4">Nenhum documento encontrado.</Text> :
        <FlatList
        data={documentos}
        keyExtractor={(item) => item.codigo.toString()}
        style={{ width: '100%'}}
        contentContainerStyle={{ paddingVertical: 10, marginLeft: 15, alignContent: 'center' }}
        renderItem={({ item }) => (
            <Card className="w-[97%] min-h-[60PX] justify-center bg-gray-100 rounded-md mb-4">
              <HStack className="gap-4  items-center justify-space-between">
                <Center className="w-[10%]">
                  <Text className="font-heading text-gray200 text-xs">{item.codigo}</Text>
                </Center>
                <Center className="w-[45%] justify-start">
                  <Text className="font-heading text-gray200 text-xs">{item.nome}</Text>
                </Center>
                <Center className="w-[45%] ml-2">
                    <HStack className="gap-4">
                            <TouchableOpacity disabled={!item.apresentarPreview} onPress={() => handleVisualizar(item.codigo, item.nome, item.extensao)}>
                                <Feather name="eye" size={20} color={item.apresentarPreview ? "#1e40af" : "#9ca3af" } />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDownload(item.codigo, item.nome.replace('.pdf', ''), item.extensao)}>
                                <Feather name="download" size={20} color={"#1e40af"} />
                            </TouchableOpacity>
                    </HStack>
                </Center>
              </HStack>
            </Card>
        )}
        onEndReached={() => {
          if (hasMore && !isLoading) {
            fetchDocumentos(true);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={hasMore ? <Loading /> : null}
      />}
      <Fab onPress={() => navigator.navigate('Upload')} className=" w-[14%] h-[7%] bg-white active:bg-gray-100 shadow-gray-200 shadow-md mr-3 mb-12 " placement="bottom right" >
        <Feather name="plus" size={24} color="#1e40af" />
      </Fab>
    </VStack>
  );
};