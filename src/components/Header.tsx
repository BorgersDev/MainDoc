import {
  HStack,
  VStack,
  Text,
  Input,
  InputField,
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  ChevronUpIcon,
} from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";
import { PopupMenu } from "./PopupMenu";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { TouchableOpacity } from "react-native";

export const Header = () => {
  const { signOut } = useAuth();

  const navigator = useNavigation<AppNavigationRoutesProps>();
  return (
    <VStack>
      <Accordion
        type="multiple"
        shadowColor="transparent"
      >
        <AccordionItem value="a">
            <HStack  justifyContent="space-between">
              <HStack bg="$gray700" justifyContent="space-between" px="$4" py="$2" alignItems="center">
                <HStack gap="$2" alignItems="center" w="$80%" >
                  <Feather name="user" size={27} color="$gray300" />
                  <VStack>
                    <Text fontFamily="$heading">Arthur Borges</Text>
                    <Text>Nov4 Lab</Text>
                  </VStack>
                </HStack>
                  <PopupMenu
                    items={[
                      {
                        title: "Trocar de empresa",
                        icon: "repeat",
                        action: () => navigator.navigate("TrocarEmpresa"),
                      },
                      {
                        title: "Logout",
                        icon: "log-out",
                        action: () => signOut(),
                      },
                    ]}
                  />
              </HStack>
              <HStack ml="-$4" w="$30%" >
              <AccordionTrigger backgroundColor="$gray700">
                {({ isExpanded }) => {
                  return (
                    <>
                      {isExpanded ? (
                        <AccordionIcon as={ChevronUpIcon} />
                      ) : (
                        <Feather name="search" size={22} />
                      )}
                    </>
                  );
                }}
              </AccordionTrigger>
              </HStack>
            </HStack>
          <AccordionContent mt="$0" mb="$-10"
            sx={{
              backgroundColor: "$gray700",
            }}>
            <Input bg="$gray700" justifyContent="space-between" alignItems="center" mx="6%" mt="$2" h="$8" borderRadius="$lg">
              <InputField
                placeholder="Buscar arquivo"
                fontSize="$sm"
                color="$gray300"
                placeholderTextColor="$gray400"
              />
              <HStack mx="$2" alignItems="center">
                <TouchableOpacity onPress={() => console.log("piru1")}>
                  <Feather name="search" size={18} />
                </TouchableOpacity>
              </HStack>
            </Input>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};
