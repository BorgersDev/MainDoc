import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Center, Text, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";




export const Usuario = ( ) => {

    const {signOut} = useAuth();

    return (
        <Center flex={1}>
            <VStack flex={1}  w="$full" bg="$gray600">
                <Center flex={1} mt="$32">
                <VStack flex={1} gap="$2"  w="80%" bg="$gray800">

                    <Text pl="$2" color="$gray100" fontFamily="$heading"> Nome: </Text>
                    <Input placeholder="Arthur Borges"  />

                    <Text pl="$2" color="$gray100" fontFamily="$heading"> Email: </Text>
                    <Input placeholder="arthur@email.com"  />
                    
                    <Text pl="$2" color="$gray100" fontFamily="$heading"> CPF: </Text>
                    <Input placeholder="667.536.390-55"  />
                    <Button title="SignOut" mt="$10" onPress={signOut} />
                </VStack>
                </Center>
            </VStack>
            
        </Center>
    )
}