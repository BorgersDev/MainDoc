import { useState, useEffect } from "react";


import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";

import { FlatList, TouchableOpacity } from "react-native";

import { api } from "@services/api";

import { VStack } from "@/components/ui/vstack";
import { Header } from "@components/Header";
import { DocumentCard } from "@components/DocumentCard";
import { Fab, FabLabel, FabIcon } from '@/components/ui/fab';
import { AddIcon } from "@/components/ui/icon";
import { Departamentos } from "@components/Departamentos";
import { Feather } from "@expo/vector-icons"
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { AppError } from "@utils/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@components/ToastMessage";
import { useAuth } from "@hooks/useAuth";
import { DepartamentoDTO } from "@dtos/DepartamentoDTO";
import { TipoDocumentoDTO } from "@dtos/TipoDocumentoDTO";
import { Loading } from "@components/Loading";

export const Arquivos = () => {
  const user = useAuth();
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const departamentoss = ["Financeiro", "Logistica", "Diretoria", "RH", "Suporte"]
  const [selectedDepartment, setSelectedDepartment] = useState('1')
  const toast = useToast();
  const [ departamentos, setDepartamentos ] = useState<DepartamentoDTO>({} as DepartamentoDTO);
  const [tipoDocumento, setTipoDocumento] = useState<TipoDocumentoDTO[]>([]);
  const [ searchQuery, setSearchQuery ] = useState('');

 
  const fetchDepartamentos = async ( ) => {
    try {
      const response = await api.get('/arquivo/listar/departamento', {
        headers: {
          filtroBusca: ''
        }
      })
      setDepartamentos(response.data.list)
      setSelectedDepartment(response.data.list[0].codigoDepartamento)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title =  "Não foi possível carregar os departamentos "
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
  const fetchTipoDocumento= async ( ) => {
    try {
      const response = await api.get(`/arquivo/listar/tipoDocumento/${selectedDepartment}`, {
        headers: {
          filtroBusca: searchQuery
        }
      })

      const list = response.data.list;
      if(list.length === 0) {
        setTipoDocumento([]);
        return;
      }

      setTipoDocumento(response.data.list[0].tipoDocumentoArquivoVOs)
    } catch (error) {
      console.log(error)
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
            
    }
  }

  useEffect(() => {
    fetchDepartamentos()
  }, [])
  useEffect(() => {
    fetchTipoDocumento()
  }, [selectedDepartment])
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTipoDocumento();
    }, 500);
    return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

  return (
    <VStack className="flex-1 bg-gray-200 mt-[14%]">
      <Header GoBack={false} InputValue={searchQuery} setInputValue={setSearchQuery} />
      <FlatList data={departamentos} keyExtractor={(item) => item.codigoDepartamento.toString()} renderItem={({ item }) => (
        <Departamentos title={item.nome} qtdDoc={item.qtdDoc} isActive={selectedDepartment === item.codigoDepartamento} onPress={() => (setSelectedDepartment(item.codigoDepartamento))} />
      )} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }} style={{ marginVertical: 10, maxHeight: 44, minHeight: 44 }} />
      <Card className="w-[100%] h-[7%] justify-center bg-blue-800 rounded-xs mb-1">
              <HStack className="gap-4  items-center justify-space-between">
                <Center className="w-[33%]">
                  <Text className="font-heading text-gray-100 text-xs">TIPO DOCUMENTO</Text>
                </Center>
                <Center className="w-[33%]">
                  <Text className="font-heading text-gray-100 text-xs">QTDE DOCUMENTOS</Text>
                </Center>
                <Center className="w-[33%]">
                  <Text className="font-heading text-gray-100 text-xs">OPÇÕES</Text>
                </Center>
              </HStack>
            </Card>
            { tipoDocumento.length === 0  ? <Text className="text-gray-500 text-center mt-4">Nenhum tipo de documento encontrado.</Text> : 
        <FlatList
        data={tipoDocumento}
        keyExtractor={(item) => item.codigo.toString()}
        style={{ width: '100%'}}
        contentContainerStyle={{ paddingVertical: 10, marginLeft: 15, alignContent: 'center' }}
        renderItem={({ item }) => (
            <Card className="w-[97%] min-h-[60PX] justify-center bg-gray-100 rounded-md mb-4">
              <HStack className="gap-4  items-center justify-space-between">
                <Center className="w-[33%]">
                  <Text className="font-heading text-gray200 text-xs">{item.nome}</Text>
                </Center>
                <Center className="w-[33%]">
                  <Text className="font-heading text-gray200 text-xs">{item.qtdDoc}</Text>
                </Center>
                <Center className="w-[33%]">
                  <Button className="bg-blue-700 max-h-7 max-w-16" onPress={() => {
                     const departamento = item.codigoDepartamento;
                     const tipoDocumento = item.codigo;
                   
                     if (!departamento || !tipoDocumento) {
                       console.log('Dados inválidos:', item);
                       return;
                     }
                   
                     navigator.navigate('DocsPorTipo', {
                       codigoDepartamento: departamento,
                       codigoTipoDocumento: tipoDocumento,
                     });
                  }}>
                    <Feather name="search" size={15} color={"#fff"} />
                  </Button>
                </Center>
              </HStack>
            </Card>
        )}
      />}
      
      <Fab onPress={() => navigator.navigate('Upload')} className=" w-[14%] h-[7%] bg-white active:bg-gray-100 shadow-gray-200 shadow-md mr-3 mb-12 " placement="bottom right" >
        <FabIcon as={AddIcon} className="color-gray-950" />
      </Fab>
    </VStack>
  );
};