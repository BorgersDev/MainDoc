import { HStack, Image, Text } from "@gluestack-ui/themed"
import LogoImg from "@assets/MainDocLogo.png"

type LogoProps = {
    variant?: "size1" | "size2"
}

export const Logo = ({variant = "size1", ...rest}: LogoProps) => {
    return (
        <HStack flex={1} alignItems="center" {...rest}>
            <Image source={LogoImg} size={variant === "size1" ? "2xs" : "3xs"} resizeMode="contain" alt="Main Doc Logo" />
            <Text color={variant === "size1" ? "$gray700" : "$blue900"} size={variant === "size1" ? "3xl" : "2xl"} fontFamily="$heading"> MainDoc  </Text>
        </HStack>
    )
}