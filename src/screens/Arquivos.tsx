// import { Input } from "@components/Input";
import { Center, HStack, Input, Text, VStack } from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";





export const Arquivos = ( ) => {
    return (
        <VStack flex={1} justifyContent="center" bg="$gray600" >
             {/* <Input placeholder="Buscar arquivo" autoCorrect={false} /> */}
             <Input justifyContent="space-between" alignItems="center" mx="5%" px="$2" borderRadius="$lg" h="5%" >
             <Text color="$gray400" fontFamily="$heading" >Buscar arquivo</Text>
                <HStack mx="$2" alignItems="center" >
                    <Pressable onPress={() => console.log("piru1")}>
                          <Feather name="search" size={23} />
                    </Pressable>
                    <Text  fontSize="$3xl" color="$gray400" mx="$2.5" >I</Text>
                    <Pressable onPress={() => console.log("piru2")}>
                          <Feather name="sliders" size={23} />
                    </Pressable>

                </HStack>
             </Input>
        </VStack>
    )
}