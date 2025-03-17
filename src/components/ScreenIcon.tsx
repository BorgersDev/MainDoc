import { Text } from "@/components/ui/text";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Pressable, GestureResponderEvent } from "react-native";
import { ComponentProps } from "react";
import { icon } from "../../constants/icon";

type ScreenIconProps = ComponentProps<typeof Pressable> & {
    screen: string;
    realName?: string;
    onPress: (screen: string) => void;
};

export const ScreenIcon = ({ screen, realName = screen, onPress, ...rest }: ScreenIconProps) => {
    const handlePress = () => {
        if (onPress) {
            onPress(screen);
        }
    };

    const words = realName.split(' ')

    return (
        <Pressable
            onPress={handlePress}
            {...rest}
        >
            <Center className="gap-2">
                <Box
                    shadowColor="$gray300"
                    shadowOffset={{ width: 0, height: 3 }}
                    shadowRadius={6}
                    shadowOpacity={0.2}
                    className="bg-gray-600 p-4 rounded-lg">
                    {icon[screen]({
                        color: "#00419d"
                    })}
                </Box> 
                <Text
                    className="font-heading text-center text-gray-100 flex-wrap w-[100%] text-xs">
                    {words[0]} {"\n"} {words.length > 1 && words[1]}  
                </Text>
            </Center>
        </Pressable>
    );
};

