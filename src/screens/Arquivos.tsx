import { Box, Button, Card, Center, Heading, HStack, Image, Input, Text, VStack } from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { DocumentCard } from "@components/DocumentCard";





export const Arquivos = ( ) => {
    return (
        <VStack flex={1}  bg="$gray600" >
            <VStack pt="$15" mb="$10" pb="$5" bg="$gray600" borderRadius="$2xl"
                    // shadowColor="$gray300"
                    // shadowOffset={{ width: 0, height: 3 }}
                    // shadowRadius={6}
                    // shadowOpacity={0.2} 
            >

                <Input  bg="$gray600" justifyContent="space-between" alignItems="center" mx="5%" px="$2" borderRadius="$lg"  >
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
            <VStack flex={1} mx="5%" gap="$4">
               <DocumentCard name="SEI Atualizações Melhorias - 8.0.3.2.pdf" />
               <DocumentCard name="SEI Atualizações Melhorias - 8.0.3.2.pdf" />
               <DocumentCard name="SEI Atualizações Melhorias - 8.0.3.2.pdf" />
               <DocumentCard name="SEI Atualizações Melhorias - 8.0.3.2.pdf" />

            </VStack>
        </VStack>
    )
}