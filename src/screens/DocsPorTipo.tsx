import { VStack } from "@/components/ui/vstack";
import { Header } from "@components/Header";
import { DocumentCard } from "@components/DocumentCard";
import { Fab, FabLabel, FabIcon } from '@/components/ui/fab';
import { AddIcon } from "@/components/ui/icon";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { FlatList, TouchableOpacity } from "react-native";
import { Departamentos } from "@components/Departamentos";
import { Feather } from "@expo/vector-icons"
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { api } from "@services/api";

export const DocsPorTipo = () => {
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const [selectedDepartment, setSelectedDepartment] = useState('RH')


  const fetchDocumentos= async ( ) => {
    try {
      const response = await api.get(`/arquivo/listar/tipoDocumento/${selectedDepartment}`, {
        headers: {
          filtroBusca: ''
        }
      })
      setTipoDocumento(response.data.list[0].tipoDocumentoArquivoVOs)
      console.log('TIPO DOCUMENTO ===> ',tipoDocumento)
    } catch (error) {
      console.log('ERROR ===> ',error)
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

  let documentos = [
     "NOTA FISCAL",
    "ALVARÁ DE FUNCIONAMENTO", "BALANÇO PATRIMONIAL", "CERTIFICADO DIGITAL", "DECLARAÇÃO DE IMPOSTO", "ESCRITURA PÚBLICA",
    "FICHA CADASTRAL", "GUIA DE RECOLHIMENTO", "HISTÓRICO EMPRESARIAL", "INVENTÁRIO PATRIMONIAL", "JUNTA COMERCIAL",
    "KITS DOCUMENTAIS", "LICENÇA AMBIENTAL", "MANDATO PROCURAÇÃO", "NORMAS REGULADORAS", "ORÇAMENTOS",
    "PROCURAÇÃO PARTICULAR", "QUITAÇÃO DE DÉBITOS", "RECIBOS", "SIMPLES NACIONAL", "TERMO DE RESCISÃO",
    "UNIFORMIZAÇÃO DE DOCUMENTOS", "VISTORIA IMOBILIÁRIA", "XEROX AUTENTICADA", "YOUTUBE CONTRATO PUBLICIDADE", "ZONA REGULAMENTADA",
    "ATESTADO DE ANTECEDENTES", "BOLETIM DE OCORRÊNCIA", "CERTIFICADO DE CONCLUSÃO", "DIPLOMA ACADÊMICO",
    "EXTRATO BANCÁRIO", "FATURAMENTO MENSAL", "GUIA DE TRIBUTOS", "HABILITAÇÃO PROFISSIONAL", "IDENTIDADE FUNCIONAL",
    "JURISPRUDÊNCIA TRABALHISTA", "KITS REGULAMENTARES", "LAUDO TÉCNICO", "MINUTA CONTRATUAL", "NOTIFICAÇÃO EXTRAJUDICIAL",
    "OPÇÃO PELO SIMPLES", "PROTOCOLO DE DOCUMENTOS", "REQUERIMENTO ADMINISTRATIVO", "SENTENÇA JUDICIAL"
  ];    
  return (
    <VStack className="flex-1 bg-gray-200 mt-[14%]">
      <Header GoBack={true} />
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
      <FlatList
        data={documentos}
        keyExtractor={(item) => item}
        style={{ width: '100%'}}
        contentContainerStyle={{ paddingVertical: 10, marginLeft: 15, alignContent: 'center' }}
        renderItem={({ item }) => (
            <Card className="w-[97%] min-h-[60PX] justify-center bg-gray-100 rounded-md mb-4">
              <HStack className="gap-4  items-center justify-space-between">
                <Center className="w-[10%]">
                  <Text className="font-heading text-gray200 text-xs">3</Text>
                </Center>
                <Center className="w-[45%] justify-start">
                  <Text className="font-heading text-gray200 text-xs">{item}</Text>
                </Center>
                <Center className="w-[45%] ml-2">
                    <HStack className="gap-4">
                            <TouchableOpacity>
                                <Feather name="eye" size={20} color={"#1e40af"} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Feather name="download" size={20} color={"#1e40af"} />
                            </TouchableOpacity>
                    </HStack>
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