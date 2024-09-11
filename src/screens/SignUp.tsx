import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { Logo } from "@components/Logo"
import { Center, Heading, HStack, Text, ScrollView, VStack } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigationRoutesProps } from "@routes/auth.routes"





export const SignUp = () => {
    const navigator = useNavigation<AuthNavigationRoutesProps>();

    const handleGoBack = () => {
        navigator.goBack()
    }

    return (
        <ScrollView 
            w="$full"
            contentContainerStyle={{ flexGrow: 1}} 
            showsVerticalScrollIndicator={false} 
            automaticallyAdjustKeyboardInsets 
            bounces={false}
            $active-alignItems="center"
        >
∏
            <VStack w="$full" flex={1} bg="$gray700"  >
                <VStack w="$full" flex={1} px="$12"  bg="$gray600" rounded="$3xl">

                    <Center  my="$33">
                        <Logo />
                    </Center>

                    <Center  my="-$14" gap="$2">
                        <Heading fontSize="$md" > Crie sua conta </Heading>

                        {/* <Input placeholder="CNPJ" autoCorrect={false} keyboardType="number-pad" />
                        <Input placeholder="Razão Social" autoCorrect={false}  /> */}
                        <Input placeholder="CPF" autoCorrect={false} keyboardType="number-pad" />
                        <Input placeholder="Username" autoCorrect={false}  />
                        <Input placeholder="E-mail" autoCorrect={false} keyboardType="email-address" />
                        <Input placeholder="Senha" autoCapitalize="none" autoCorrect={false} secureTextEntry />
                        <Input placeholder="Confirmar senha" autoCapitalize="none" autoCorrect={false} secureTextEntry />


                        <Button title="Criar e acessar" my="$12" />
                    </Center>

                </VStack>
                
                <Center h="$40" flex={1} px="$12">
                    <Heading fontSize="$sm" fontFamily="$heading" >Já possui uma conta? </Heading>

                    <Button title="Faça Login" variant="clear" onPress={handleGoBack} />
                </Center>
            </VStack>
        </ScrollView>
    )
}