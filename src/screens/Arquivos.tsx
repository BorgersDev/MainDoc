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

export const Arquivos = () => {
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const departamentos = ["Financeiro", "Logistica", "Diretoria", "RH", "Suporte"]
  const [selectedDepartment, setSelectedDepartment] = useState('RH')
  const toast = useToast();
  const fetchDepartamentos = async ( ) => {
    try {
      const response = await api.get('/arquivo/listar/departamento/10/0')
      console.log('DEPARTAMENTOS =>', response.data)
    } catch (error) {
      console.log(error)
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


  useEffect(() => {
    fetchDepartamentos()
  }, [])

  return (
    <VStack className="flex-1 bg-gray-200 mt-[14%]">
      <Header GoBack={false} />
      <FlatList data={departamentos} keyExtractor={(item) => item} renderItem={({ item }) => (
        <Departamentos title={item} isActive={selectedDepartment.toLowerCase() === item.toLowerCase()} onPress={() => setSelectedDepartment(item)} />
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
      <FlatList
        data={['CERTIDOES NEGATIVAS', 'CONTRATO SOCIAL', 'DOCUMENTO PESSOAL', 'CONTRATOS 2', 'OUTROS','NOTA FISCAL']}
        keyExtractor={(item) => item}
        style={{ width: '100%'}}
        contentContainerStyle={{ paddingVertical: 10, marginLeft: 15, alignContent: 'center' }}
        renderItem={({ item }) => (
            <Card className="w-[97%] min-h-[60PX] justify-center bg-gray-100 rounded-md mb-4">
              <HStack className="gap-4  items-center justify-space-between">
                <Center className="w-[33%]">
                  <Text className="font-heading text-gray200 text-xs">{item}</Text>
                </Center>
                <Center className="w-[33%]">
                  <Text className="font-heading text-gray200 text-xs">520</Text>
                </Center>
                <Center className="w-[33%]">
                  <Button className="bg-blue-700 max-h-7 max-w-16" onPress={() => navigator.navigate('DocsPorTipo')}>
                    <Feather name="search" size={15} color={"#fff"} />
                  </Button>
                </Center>
              </HStack>
            </Card>
        )}
      />
      <Fab onPress={() => navigator.navigate('Upload')} className=" w-[14%] h-[7%] bg-white active:bg-gray-100 shadow-gray-200 shadow-md mr-3 mb-12 " placement="bottom right" >
        <FabIcon as={AddIcon} className="color-gray-950" />
      </Fab>
    </VStack>
  );
};