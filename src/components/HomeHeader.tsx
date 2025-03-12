import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  ChevronUpIcon,
  ChevronDownIcon,
  Center,
  AccordionTitleText,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Logo } from "./Logo";
import { Feather } from "@expo/vector-icons";
import { Accordion } from "@gluestack-ui/themed";
import { Pressable } from "react-native";
import { useAuth } from "@hooks/useAuth";


export const HomeHeader = () => {

  const { user } = useAuth();


  return (
    <Accordion
      width="$full"
      type="multiple"
      mt="10%"
      mb="7%"
      borderWidth={0}
      shadowColor="transparent"
      borderColor="$borderLight300"
      $dark-borderColor="$borderDark700"
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
        <AccordionHeader
          borderRadius="$lg"
          sx={{
            backgroundColor: "$gray600",
          }}
        >
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <Logo variant="size2" />
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} />
                  ) : (
                    <Feather name="more-horizontal" size={24} />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent
          mt="$0"
          pt="$2"
          borderRadius="$2xl"
          sx={{
            backgroundColor: "$gray700",
            _dark: {
              backgroundColor: "$gray700",
            },
          }}
        >
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <AccordionContentText fontFamily="$body">
                Nome: <Text fontFamily="$heading">{user.nome}</Text>
              </AccordionContentText>
              <AccordionContentText fontFamily="$body">
                Empresa: <Text fontFamily="$heading">{user.nomeEmpresa}</Text>
              </AccordionContentText>
            </VStack>
            <Pressable>
              <VStack
                gap="$2"
                px="$4"
                alignItems="center"
                borderRadius="$lg"
                py="$2"
              >
                <Text fontFamily="$heading">Trocar empresa ?</Text>
                <Feather name="refresh-cw" size={20} />
              </VStack>
            </Pressable>
          </HStack>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
