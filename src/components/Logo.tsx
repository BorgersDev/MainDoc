import { HStack, Image, Text } from "@gluestack-ui/themed"
import LogoImg from "@assets/MainDocLogo.png"

export const Logo = () => {
    return (
        <HStack alignItems="center"  >
            <Image source={LogoImg} size="2xs" resizeMode="contain" alt="Main Doc Logo" />
            <Text color="$blue900" size="3xl" fontFamily="$heading"> MainDoc</Text>
        </HStack>
    )
}