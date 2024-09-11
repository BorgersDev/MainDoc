import {
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
  ChevronDownIcon,
  ChevronUpIcon,
  Heading,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Logo } from "./Logo";
import { Feather } from "@expo/vector-icons";
import { Accordion } from "@gluestack-ui/themed";
import { Pressable } from "react-native";

export const HomeHeader = () => {
  return (
    <Accordion
      width="$full"
      type="multiple"
      my="$14"
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
          _dark: {
            borderBottomColor: "$gray600",
          },
        }}
      >
        <AccordionHeader
            borderRadius="$lg"
          sx={{
            backgroundColor: "$gray600",
            _dark: {
              backgroundColor: "$gray600",
            },
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
                    <AccordionContentText fontFamily="$body" >
                        Nome: <Text fontFamily="$heading" >Rodrigo Wind</Text>
                    </AccordionContentText>
                    <AccordionContentText fontFamily="$body" >
                        Empresa: <Text fontFamily="$heading" >Otimize-Ti</Text>
                    </AccordionContentText>
                </VStack>
                <Pressable>
                    <VStack gap="$2" px="$4" alignItems="center" bg="$gray600" borderRadius="$lg" py="$2" >
                        <Text fontFamily="$heading" >Trocar empresa ?</Text>
                        <Feather name="refresh-cw" size={20} />
                    </VStack>
                    
                </Pressable>
                
            </HStack>
          
        </AccordionContent>
      </AccordionItem>
      
    </Accordion>
  );
};
