import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useAuth } from "@hooks/useAuth";




export const Usuario = ( ) => {

    const {signOut} = useAuth();

    return (
        <Center className="flex-1">
            <VStack className="flex-1 w-full bg-gray-600">
                <Center className="flex-1 mt-32">
                <VStack className="flex-1 gap-2 w-[80%] bg-gray-800">

                    <Text className="pl-2 text-gray-100 font-heading"> Nome: </Text>
                    <Input placeholder="Arthur Borges"  />

                    <Text className="pl-2 text-gray-100 font-heading"> Email: </Text>
                    <Input placeholder="arthur@email.com"  />
                    
                    <Text className="pl-2 text-gray-100 font-heading"> CPF: </Text>
                    <Input placeholder="667.536.390-55"  />
                    <Button title="SignOut" mt="$10" onPress={signOut} />
                </VStack>
                </Center>
            </VStack>
        </Center>
    );
}