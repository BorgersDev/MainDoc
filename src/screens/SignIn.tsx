import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { Logo } from "@components/Logo"
import { Center, Heading, HStack, ScrollView, Text, VStack } from "@gluestack-ui/themed"





export const SignIn = () => {
    return (
        <ScrollView 
            w="$full"
            contentContainerStyle={{ flexGrow: 1}} 
            showsVerticalScrollIndicator={false} 
            automaticallyAdjustKeyboardInsets 
            bounces={false}
            $active-alignItems="center"
        >
            <VStack w="$full" flex={1} bg="$gray700"  >
                <VStack w="$full" flex={1} px="$12" pb="$16" bg="$gray600" rounded="$3xl">

                    <Center  my="$33">
                        <Logo />
                    </Center>

                    <Center  gap="$2">
                        <Heading fontSize="$md" > Acesse sua conta </Heading>

                        <Input placeholder="Username" autoCorrect={false} keyboardType="number-pad" />
                        <Input placeholder="Senha" autoCapitalize="none" autoCorrect={false} secureTextEntry />

                        <Button title="Entrar" my="$14" />
                    </Center>

                </VStack>
                
                <Center h="$56" flex={1} px="$12">
                    <Heading fontSize="$sm" fontFamily="$heading" >Ainda não tem acesso? </Heading>

                    <Button title="Crie uma conta" variant="clear" />
                </Center>
            </VStack>
        </ScrollView>
    )
}