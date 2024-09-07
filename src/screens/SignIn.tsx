import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { Logo } from "@components/Logo"
import { Center, Heading, HStack, Text, VStack } from "@gluestack-ui/themed"





export const SignIn = () => {
    return (
        <VStack w="$full" flex={1} px="$12" pb="$16" bg="$gray600"  >

            <Center  my="$32">
               <Logo />
            </Center>

            <Center  gap="$2">
                <Heading fontSize="$md" > Acesse sua conta </Heading>

                <Input placeholder="CPF" autoCorrect={false} keyboardType="number-pad" />
                <Input placeholder="Senha" autoCapitalize="none" autoCorrect={false} secureTextEntry />

                <Button title="Entrar" />
            </Center>

        </VStack>
    )
}