import { ChevronUpIcon } from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
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
      <Accordion type="multiple" className="shadow-transparent">
        <AccordionItem value="a">
          <HStack className="justify-between">
            <HStack className="bg-gray-100 justify-between px-4 py-2 items-center">
              <HStack className=" pl-2.5 gap-2 items-center w-[80%]">
                <Feather name="user" size={27} color="gray-300" />
                <VStack>
                  <Text className="font-heading">Arthur Borges</Text>
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
            <HStack className="ml-[-4px] w-[30%]">
              <AccordionTrigger className="bg-gray-100">
                {({ isExpanded }) => (
                  <>
                    {isExpanded ? <AccordionIcon as={ChevronUpIcon} /> : <Feather name="search" size={22} />}
                  </>
                )}
              </AccordionTrigger>
            </HStack>
          </HStack>
          <AccordionContent className="mt-0 mb-[-10px] bg-gray-100">
            <Input className="bg-gray-200 justify-between items-center mx-[6%] mt-2 mb-3 h-8 rounded-lg">
              <InputField
                placeholder="Buscar arquivo"
                placeholderTextColor="gray-400"
                className="text-sm text-gray-300"
              />
              <HStack className="mx-2 items-center">
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