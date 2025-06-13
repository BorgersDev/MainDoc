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
import { useState } from "react";

type HeaderProps = {
  GoBack: boolean;
  InputValue: string;
  setInputValue?: (value: string) => void;
}

export const Header = ({GoBack, InputValue, setInputValue}: HeaderProps) => {
  const { signOut, user, umaEmpresa } = useAuth();
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const [ goback, setGoBack ] = useState(GoBack);
 const setPopMenuItens = () =>{}
  return (
    <VStack>
      <Accordion type="multiple" className="shadow-transparent">
        <AccordionItem value="a">
          <HStack className="justify-between">
            <HStack className="bg-gray-100 justify-between px-4 py-2 items-center">
              <HStack className=" pl-2.5 gap-2 items-center w-[80%]">
                { goback ? 
                <TouchableOpacity className="mr-8" onPress={() => navigator.goBack()}>
                <HStack className=" gap-1 items-center">
                    <Feather className="" name="arrow-left" size={22} color="gray-300" />
                    <Text className="font-heading text-gray-950">Voltar</Text>
                </HStack>
                </TouchableOpacity> : <></>
                }
                <Feather name="user" size={27} color="gray-300" />
                <VStack>
                  <Text className="font-heading">{user.nome}</Text>
                  <Text>{user.nomeEmpresa}</Text>
                </VStack>
              </HStack>
              {
                umaEmpresa ? (
                  <PopupMenu
                items={[
                  {
                    title: "Logout",
                    icon: "log-out",
                    action: () => signOut(),
                  },
                ].filter(item => user.empresaVOs|| item.title !== "Trocar de empresa")}
              />
                ) : (
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
                ].filter(item => user.empresaVOs|| item.title !== "Trocar de empresa")}
              />
                )

              }
            </HStack>
            <HStack className="ml-[-4px] w-[30%]">
              <AccordionTrigger className="bg-gray-100">
                {({ isExpanded }) => (
                  <>
                    {isExpanded ? <Feather name="chevron-up" size={22} /> : <Feather name="search" size={22} />}
                  </>
                )}
              </AccordionTrigger>
            </HStack>
          </HStack>
          <AccordionContent className="mt-0 mb-[-10px] bg-gray-100">
            <Input className="bg-gray-200 justify-between items-center mx-[6%] mt-2 mb-3 h-8 rounded-lg">
              <InputField
                placeholder="Buscar"
                placeholderTextColor="gray-400"
                className="text-sm text-gray-800"
                value={InputValue}
                onChangeText={setInputValue}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <HStack className="mx-2 items-center">
                <TouchableOpacity onPress={() => console.log("teste")}>
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