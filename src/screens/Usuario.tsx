import { Input } from "@components/Input";
import { Center, Text, VStack } from "@gluestack-ui/themed";




export const Usuario = ( ) => {
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
                </VStack>
                </Center>
            </VStack>
            
        </Center>
    )
}