import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Feather } from "@expo/vector-icons"
import { FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Card } from "@/components/ui/card";
import { useAuth } from "@hooks/useAuth";



export const SelecionarEmpresa = () => {
    const { user, switchComp, setEmpresaConfirmada } = useAuth();
    const navigator = useNavigation<AppNavigationRoutesProps>();
    let empresas = user.empresaVOs;

    const handleTrocarEmpresa = (codigo: number) => {
        switchComp(codigo);
 
        setEmpresaConfirmada(true)
    }
    return (
        <SafeAreaView className="flex-1 bg-gray-200">
            <Text>{user.empresaVOs[0].codigo}</Text>
            <VStack className="flex-1">
                <HStack className="pr-6 justify-end">
                    {/* <TouchableOpacity onPress={() => navigator.navigate('Arquivos')}>
                        <HStack className="gap-1">
                            <Feather name="x" size={24} color="$gray300" />
                        </HStack>
                    </TouchableOpacity> */}
                </HStack>
                <Center className="flex-1 justify-center items-end ">
                    <FlatList
                        data={empresas}
                        keyExtractor={(item) => item.codigo}
                        style={{ width: '100%', marginTop: 30}}
                        contentContainerStyle={{ paddingVertical: 10, marginLeft: 30, alignContent: 'center' }}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleTrocarEmpresa(item.codigo)}>
                                <Card className="w-[90%] min-h-[40PX] justify-center bg-gray-100 rounded-2xl mb-4">
                                    <HStack className="gap-4 px-5 items-center">
                                        <Feather name="briefcase" size={22} color={"#075985"} />
                                        <Text className="font-heading text-lightBlue-800 text-md">{item.nome}</Text>
                                    </HStack>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                </Center>
            </VStack>
        </SafeAreaView>
    );
}