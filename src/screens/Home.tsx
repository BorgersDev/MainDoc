import { HomeHeader } from "@components/HomeHeader";
import { ScreenIcon } from "@components/ScreenIcon";
import { Center, HStack, Text, VStack } from "@gluestack-ui/themed";




export const Home = ( ) => {
    return (
        <VStack flex={1} bg="$gray600" >
            <HomeHeader />

            <HStack justifyContent="center" gap="$4" flex={1}>
                <ScreenIcon />
                <ScreenIcon />
                <ScreenIcon />
                <ScreenIcon />
            </HStack>
        </VStack>
    )
}