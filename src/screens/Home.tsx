import { HomeHeader } from "@components/HomeHeader";
import { ScreenIcon } from "@components/ScreenIcon";
import { Feather } from "@expo/vector-icons";

import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  Card,
  Center,
  ChevronDownIcon,
  ChevronUpIcon,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Pressable } from "react-native";

export const Home = () => {
  const handlePiroca = () => {
    console.log("ola")
  }
  return (
    <VStack flex={1} bg="$gray600">
      <HomeHeader />
      <Card
        size="sm"
        variant="elevated"
        mx="$5"
        borderRadius="$2xl"
        shadowColor="$gray300"
        shadowOffset={{ width: 0, height: 3 }}
        shadowRadius={6}
        shadowOpacity={0.2}
        bg="$gray600"
      >


        <Accordion
          width="$full"
          type="multiple"
          borderWidth={0}
          shadowColor="$white"
          borderRadius="$3xl"
        >
          <AccordionItem
            value="a"
            borderBottomWidth={0}
            borderRadius="$2xl"
            sx={{
              borderBottomColor: "$gray600",
            }}
          >
            <AccordionHeader sx={{ backgroundColor: "$gray600" }}>
              <AccordionTrigger>
                {({ isExpanded }) => (
                  <>
                    <HStack w="$full" alignItems="center">
                      <Heading size="sm">Administrativo</Heading>
                      <Center w="$full" justifyContent="flex-end" pl="$16" >
                        <Feather name={isExpanded ? "chevron-up" : "chevron-down"} size={24} />
                      </Center>
                    </HStack>
                  </>
                )}
              </AccordionTrigger>
              <VStack>
                <HStack justifyContent="flex-start" pl="$4.5" gap="$6" w="$full" alignItems="center">
                  <ScreenIcon onPress={handlePiroca} />
                  <ScreenIcon />
                  <ScreenIcon />
                  <ScreenIcon />
                </HStack>
              </VStack>
            </AccordionHeader>

            <AccordionContent mt="$0" pt="$2" sx={{ backgroundColor: "$gray600" }}>
              <VStack>
                <Heading mb="$1" py="$2" size="sm">Gestão de Arquivos</Heading>
                <HStack justifyContent="flex-start" gap="$6" w="$full" alignItems="center">
                  <ScreenIcon />
                  <ScreenIcon />
                </HStack>
              </VStack>

              <VStack>
                <Heading mb="$1" py="$2" size="sm">Segurança</Heading>
                <HStack justifyContent="flex-start" gap="$6" w="$full" alignItems="center">
                  <ScreenIcon />
                  <ScreenIcon />
                </HStack>
              </VStack>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </VStack>
  );
};
