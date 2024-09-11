import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { Logo } from "./Logo";
import {Feather} from "@expo/vector-icons"




export const HomeHeader = () => {
    return (
        <VStack w="$full" bg="$gray700" pt="$14" px="$8" pb="$4" borderRadius="$2xl">
            <HStack w="$full" justifyContent="space-between" alignItems="center">
                <Logo variant="size2" />
                <Feather name="more-horizontal" size={24} />
            </HStack>
            
            {/* <Heading color="$gray100" fontSize="$sm" >Olá, Rodrigo Wind</Heading> */}
        </VStack>
    );
}