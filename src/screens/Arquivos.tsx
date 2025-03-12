import {
  Box,
  Button,
  Card,
  Center,
  Heading,
  HStack,
  Image,
  Input,
  SafeAreaView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Header } from "@components/Header";
import { DocumentCard } from "@components/DocumentCard";

export const Arquivos = () => {
  return (

    // <SafeAreaView flex={1} bg="$gray700"> 
      <VStack flex={1} bg="$gray600" mt="$12%" >
        <VStack
          mb="$10"
          pb="$5"
          borderRadius="$2xl"
          shadowColor="$gray300"
          shadowOffset={{ width: 0, height: 3 }}
          shadowRadius={2}
          shadowOpacity={0.2}
        >
          <Header />
          
        </VStack>
        <VStack flex={1} mx="5%" gap="$4">
          <DocumentCard name="SEI Atualizações Melhorias " />
          <DocumentCard name="SEI Atualizações Melhorias " />
          <DocumentCard name="SEI Atualizações Melhorias " />
          <DocumentCard name="SEI Atualizações Melhorias " />
        </VStack>
      </VStack>
    // </SafeAreaView>
  );
};
