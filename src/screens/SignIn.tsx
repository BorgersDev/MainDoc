import { Logo } from "@components/Logo"
import { Center, HStack, Text, VStack } from "@gluestack-ui/themed"





export const SignIn = () => {
    return (
        <VStack flex={1}  >
            <Center  my="$24">
               <Logo />
            </Center>
            
        </VStack>
    )
}