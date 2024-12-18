import { Dimensions } from 'react-native';
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
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
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

    <VStack flex={1} bg="$gray600">
      <HomeHeader />
      <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
      >
        <VStack flex={1} mb="$40">
          <Card
            size="sm"
            variant="elevated"
            mx="5%"
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
                          <Center w="$full" justifyContent="flex-end" pl="$16">
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
                      pl="$1"
                      justifyContent="space-between"  // Distribute icons evenly
                      gap={screenWidth > 400 ? "$2" : "$2"}  // Adjust gap based on screen size
                      w={screenWidth > 400 ? "90%" : "100%"}  // Dynamically adjust width based on screen size
                      alignItems="center"
                      flexShrink={1}  // Allow icons to shrink if needed
                      >
                      <ScreenIcon onPress={handleNavigation} screen="Departamento" />
                      <ScreenIcon onPress={handleNavigation} screen="Empresa" />
                      <ScreenIcon onPress={handleNavigation} screen="TipoDeDocumento" realName="Tipo Documento" />
                      <ScreenIcon onPress={handleNavigation} screen="Licenca" realName="Licença" />
                    </HStack>
                  </VStack>
                </AccordionHeader>

                <AccordionContent
                  mt="$0"
                  pt="$2"
                  sx={{ backgroundColor: "$gray600" }}
                  >
                  <VStack>
                    <Heading mb="$1" py="$2" size="sm">
                      Gestão de Arquivos
                    </Heading>
                    <HStack
                      justifyContent="flex-start"
                      gap={screenWidth > 400 ? "$8" : "$8"}  // Adjust gap based on screen size
                      w="$full"
                      alignItems="center"
                      >
                      <ScreenIcon onPress={handleNavigation} screen="Arquivos" />
                      <ScreenIcon onPress={handleNavigation} screen="Lixeira" />
                    </HStack>
                  </VStack>

                  <VStack>
                    <Heading mb="$1" py="$2" size="sm">
                      Segurança
                    </Heading>
                    <HStack
                      justifyContent="flex-start"
                      gap={screenWidth > 400 ? "$8" : "$8"}  // Adjust gap based on screen size
                      w="$full"
                      alignItems="center"
                      >
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
            mt="$5"
            size="sm"
            variant="elevated"
            mx="5%"
            borderRadius="$2xl"
            shadowColor="$gray300"
            shadowOffset={{ width: 0, height: 3 }}
            shadowRadius={6}
            shadowOpacity={0.2}
            bg="$gray600"
            >
            <Heading size="sm">Total arquivos</Heading>
            <HStack 
              justifyContent="space-between"
              px="$14"
              py="$5"
              >
              <HStack alignItems="center" gap="$1.5" >
                <Feather name="file" color="#00419d" size={18} />
                <Heading fontSize="$md" >22</Heading>
              </HStack>
              <HStack alignItems="center" gap="$1.5" >
                <Feather name="database" color="#00419d" size={18} />
                <Heading fontSize="$sm" >6274kb</Heading>
              </HStack>
            </HStack>
          </Card>

        <ChartCard />
        <Card
            mt="$5"
            size="sm"
            variant="elevated"
            mx="5%"
            borderRadius="$2xl"
            shadowColor="$gray300"
            shadowOffset={{ width: 0, height: 3 }}
            shadowRadius={6}
            shadowOpacity={0.2}
            bg="$gray600"
            >
            <Heading size="sm">Arquivos Assinado Digitalmente</Heading>
            <HStack 
              justifyContent="space-between"
              px="$14"
              py="$5"
              >
              <HStack alignItems="center" gap="$1.5" >
                <Feather name="file" color="#00419d" size={18} />
                <Heading fontSize="$md" >8</Heading>
              </HStack>
              <HStack alignItems="center" gap="$1.5" >
                <Feather name="database" color="#00419d" size={18} />
                <Heading fontSize="$sm" >2150KB</Heading>
              </HStack>
            </HStack>
          </Card>

          <Card
            mt="$5"
            size="sm"
            variant="elevated"
            mx="5%"
            borderRadius="$2xl"
            shadowColor="$gray300"
            shadowOffset={{ width: 0, height: 3 }}
            shadowRadius={6}
            shadowOpacity={0.2}
            bg="$gray600"
            >
            <Heading size="sm">Arquivos na Lixeira</Heading>
            <HStack 
              justifyContent="space-between"
              px="$14"
              py="$5"
              >
              <HStack alignItems="center" gap="$1.5" >
                <Feather name="file" color="#00419d" size={18} />
                <Heading fontSize="$md" >8</Heading>
              </HStack>
              <HStack alignItems="center" gap="$1.5" >
                <Feather name="database" color="#00419d" size={18} />
                <Heading fontSize="$sm" >1320KB</Heading>
              </HStack>
            </HStack>
          </Card>
      </VStack>
    </ScrollView>
    </VStack>
  );
};

