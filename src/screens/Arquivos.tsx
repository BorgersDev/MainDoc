import { VStack } from "@/components/ui/vstack";
import { Header } from "@components/Header";
import { DocumentCard } from "@components/DocumentCard";
import { Fab, FabLabel, FabIcon } from '@/components/ui/fab';
import { AddIcon } from "@/components/ui/icon";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { FlatList } from "react-native";
import { Departamentos } from "@components/Departamentos";
import { useState } from "react";

export const Arquivos = () => {
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const departamentos = ["Financeiro", "Logistica", "Diretoria", "RH", "Suporte"]
  const [selectedDepartment, setSelectedDepartment] = useState('RH')
  return (
    <VStack className="flex-1 bg-gray-200 mt-[14%]">
        <Header />
        <FlatList  data={departamentos} keyExtractor={(item) => item} renderItem={({item}) =>(
          <Departamentos title={item} isActive={selectedDepartment.toLowerCase() === item.toLowerCase()} onPress={() => setSelectedDepartment(item)}/>
        )} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 10}} style={{marginVertical: 10, maxHeight: 44, minHeight:44}} />
      <VStack className="flex-1 mx-[5%] gap-4">
        <DocumentCard name="SEI Atualizações Melhorias " />
        <DocumentCard name="SEI Atualizações Melhorias " />
        <DocumentCard name="SEI Atualizações Melhorias " />
        <DocumentCard name="SEI Atualizações Melhorias " />
        <DocumentCard name="SEI Atualizações Melhorias " />
        <DocumentCard name="SEI Atualizações Melhorias " />
        <DocumentCard name="SEI Atualizações Melhorias " />
        <DocumentCard name="SEI Atualizações Melhorias " />
      </VStack>
      <Fab onPress={() => navigator.navigate('Upload')} className=" w-[14%] h-[7%] bg-white active:bg-gray-100 shadow-gray-200 shadow-md mr-3 mb-12 " placement="bottom right" >
        <FabIcon as={AddIcon} className="color-gray-950" />
      </Fab>
    </VStack>
  );
};