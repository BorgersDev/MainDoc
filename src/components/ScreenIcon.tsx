import { Box, Center, Text } from "@gluestack-ui/themed";
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
            <Center gap="$2">
                <Box
                    bg="$gray600"
                    padding="$4"
                    borderRadius="$lg"
                    shadowColor="$gray300"
                    shadowOffset={{ width: 0, height: 3 }}
                    shadowRadius={6}
                    shadowOpacity={0.2}
                >
                    {icon[screen]({
                        color: "#00419d"
                    })}
                </Box> 
                <Text fontFamily="$heading" textAlign="center" color="$gray100" flexWrap="wrap" width="100%" fontSize="$xs">
                    {words[0]} {"\n"} {words.length > 1 && words[1]}  
                </Text>
            </Center>
        </Pressable>
    );
};

