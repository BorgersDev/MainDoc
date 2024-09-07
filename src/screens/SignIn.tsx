import { Input } from "@components/Input"
import { Logo } from "@components/Logo"
import { Center, Heading, HStack, Text, VStack } from "@gluestack-ui/themed"





export const SignIn = () => {
    return (
        <VStack flex={1} px="$12" pb="$16" bg="$gray600"  >

            <Center  my="$32">
               <Logo />
            </Center>

            <Center w="$full" gap="$2">
                <Heading fontSize="$md" > Acesse sua conta </Heading>

                <Input placeholder="CPF" autoCorrect={false} keyboardType="number-pad" />
                <Input placeholder="Senha" autoCapitalize="none" autoCorrect={false} secureTextEntry />
            </Center>

        </VStack>
    )
}