import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { ScrollView } from "@/components/ui/scroll-view";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icon";
import { Center } from "@/components/ui/center";
import { Card } from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Dimensions } from 'react-native';
import { HomeHeader } from "@components/HomeHeader";
import { ScreenIcon } from "@components/ScreenIcon";
import { Feather } from "@expo/vector-icons";


import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/sprint2approutes";
import { useNavigationStateContext } from '@contexts/NavigationContext';
import { ChartCard } from '@components/ChartCard';

export const Home = () => {

  const screenWidth = Dimensions.get('window').width;

  const navigator = useNavigation<AppNavigationRoutesProps>();
  const { setIsTabScreen } = useNavigationStateContext();

  const handleNavigation = (screen: string) => {
    setIsTabScreen(false); // Mark that we're navigating to a non-tab screen
    navigator.navigate(screen);
  };
  return (
    <VStack className="flex-1 bg-gray-600">
      <HomeHeader />
      <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
      >
        <VStack className="flex-1 mb-40">
          <Card
            size="sm"
            variant="elevated"
            shadowColor="$gray300"
            shadowOffset={{ width: 0, height: 3 }}
            shadowRadius={6}
            shadowOpacity={0.2}
            className="mx-[5%] rounded-2xl bg-gray-600">
            <Accordion
              type="multiple"
              shadowColor="$white"
              className="w-full border-[0px] rounded-3xl">
              <AccordionItem value="a" className="border-b-[0px] rounded-2xl border-b-gray-600">
                <AccordionHeader className="bg-gray-600">
                  <AccordionTrigger>
                    {({ isExpanded }) => (
                      <>
                        <HStack className="w-full items-center">
                          <Heading size="sm">Administrativo</Heading>
                          <Center className="w-full justify-end pl-16">
                            <Feather
                              name={isExpanded ? "chevron-up" : "chevron-down"}
                              size={24}
                              />
                          </Center>
                        </HStack>
                      </>
                    )}
                  </AccordionTrigger>
                  <VStack>
                    <HStack
                      className={` ${screenWidth > 400 ? "w-[90%]" : "w-[100%]"} ${screenWidth > 400 ? "gap-2" : "gap-2"} pl-1 justify-between items-center shrink-[1px] `}>
                      <ScreenIcon onPress={handleNavigation} screen="Departamento" />
                      <ScreenIcon onPress={handleNavigation} screen="Empresa" />
                      <ScreenIcon onPress={handleNavigation} screen="TipoDeDocumento" realName="Tipo Documento" />
                      <ScreenIcon onPress={handleNavigation} screen="Licenca" realName="Licença" />
                    </HStack>
                  </VStack>
                </AccordionHeader>

                <AccordionContent className="mt-0 pt-2 bg-gray-600">
                  <VStack>
                    <Heading size="sm" className="mb-1 py-2">
                      Gestão de Arquivos
                    </Heading>
                    <HStack
                      className={` ${screenWidth > 400 ? "gap-8" : "gap-8"} justify-start w-full items-center `}>
                      <ScreenIcon onPress={handleNavigation} screen="Arquivos" />
                      <ScreenIcon onPress={handleNavigation} screen="Lixeira" />
                    </HStack>
                  </VStack>

                  <VStack>
                    <Heading size="sm" className="mb-1 py-2">
                      Segurança
                    </Heading>
                    <HStack
                      className={` ${screenWidth > 400 ? "gap-8" : "gap-8"} justify-start w-full items-center `}>
                      <ScreenIcon
                        onPress={handleNavigation}
                        screen="PerfilDeUsuario"
                        realName="Perfil usuário"
                        />
                      <ScreenIcon
                        onPress={handleNavigation}
                        screen="Usuário"
                        realName="Usuário"
                        />
                    </HStack>
                  </VStack>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card
            size="sm"
            variant="elevated"
            shadowColor="$gray300"
            shadowOffset={{ width: 0, height: 3 }}
            shadowRadius={6}
            shadowOpacity={0.2}
            className="mt-5 mx-[5%] rounded-2xl bg-gray-600">
            <Heading size="sm">Total arquivos</Heading>
            <HStack className="justify-between px-14 py-5">
              <HStack className="items-center gap-1.5">
                <Feather name="file" color="#00419d" size={18} />
                <Heading className="text-md" >22</Heading>
              </HStack>
              <HStack className="items-center gap-1.5">
                <Feather name="database" color="#00419d" size={18} />
                <Heading className="text-sm" >6274kb</Heading>
              </HStack>
            </HStack>
          </Card>

        <ChartCard />
        <Card
          size="sm"
          variant="elevated"
          shadowColor="$gray300"
          shadowOffset={{ width: 0, height: 3 }}
          shadowRadius={6}
          shadowOpacity={0.2}
          className="mt-5 mx-[5%] rounded-2xl bg-gray-600">
            <Heading size="sm">Arquivos Assinado Digitalmente</Heading>
            <HStack className="justify-between px-14 py-5">
              <HStack className="items-center gap-1.5">
                <Feather name="file" color="#00419d" size={18} />
                <Heading className="text-md" >8</Heading>
              </HStack>
              <HStack className="items-center gap-1.5">
                <Feather name="database" color="#00419d" size={18} />
                <Heading className="text-sm" >2150KB</Heading>
              </HStack>
            </HStack>
          </Card>

          <Card
            size="sm"
            variant="elevated"
            shadowColor="$gray300"
            shadowOffset={{ width: 0, height: 3 }}
            shadowRadius={6}
            shadowOpacity={0.2}
            className="mt-5 mx-[5%] rounded-2xl bg-gray-600">
            <Heading size="sm">Arquivos na Lixeira</Heading>
            <HStack className="justify-between px-14 py-5">
              <HStack className="items-center gap-1.5">
                <Feather name="file" color="#00419d" size={18} />
                <Heading className="text-md" >8</Heading>
              </HStack>
              <HStack className="items-center gap-1.5">
                <Feather name="database" color="#00419d" size={18} />
                <Heading className="text-sm" >1320KB</Heading>
              </HStack>
            </HStack>
          </Card>
      </VStack>
    </ScrollView>
    </VStack>
  );
};

