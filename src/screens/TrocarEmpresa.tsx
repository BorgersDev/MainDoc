import { Center, HStack, Text, VStack, SafeAreaView } from "@gluestack-ui/themed";
import {Feather} from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";



export const TrocarEmpresa = ( ) => {
    const navigator = useNavigation<AppNavigationRoutesProps>();
    return (
        <SafeAreaView flex={1} bg="$gray700" >
            <VStack flex={1}>
                <HStack paddingRight="$6" justifyContent="flex-end">
                    <TouchableOpacity onPress={() => navigator.navigate('Arquivos')}>
                        <HStack gap="$1">
                            <Feather name="x" size={24} color="$gray300" />
                        </HStack>
                    </TouchableOpacity>
             </HStack>
                <Center flex={1}>
                    <Text fontFamily="$heading" fontSize="$lg">Trocar de empresa</Text>
                </Center>
            </VStack>
        </SafeAreaView>
    )
}