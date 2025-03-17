import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import LogoImg from "@assets/MainDocLogo.png"

type LogoProps = {
    variant?: "size1" | "size2"
}

export const Logo = ({variant = "size1", ...rest}: LogoProps) => {
    return (
        <HStack {...rest} className="flex-1 items-center">
            <Image source={LogoImg} size={variant === "size1" ? "2xs" : "3xs"} resizeMode="contain" alt="Main Doc Logo" />
            <Text
                size={variant === "size1" ? "3xl" : "2xl"}
                className={` ${variant === "size1" ? "text-gray-200" : "text-blue-900"} font-heading `}> MainDoc  </Text>
        </HStack>
    );
}