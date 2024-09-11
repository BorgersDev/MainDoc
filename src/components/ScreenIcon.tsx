import { Box, Center, Text } from "@gluestack-ui/themed"
import {Feather} from "@expo/vector-icons"
import { Pressable } from "react-native"
import { ComponentProps } from "react"

type ScreenIconProps = ComponentProps<typeof Pressable>

export const ScreenIcon = ({...rest}: ScreenIconProps) => {
    return (
        <Pressable
            {...rest}
        >
            <Center gap="$2" >
                <Box
                    bg="$gray600"
                    padding="$4"
                    borderRadius="$lg"
                    shadowColor="$gray300"
                    shadowOffset={{ width: 0, height: 3 }}
                    shadowRadius={6}  
                    shadowOpacity={0.2}  
                >
                    <Feather name="trash" color="#00419d" size={23}/>
                </Box>
                <Text fontFamily="$heading" color="$gray100" fontSize="$xs">Lixeira</Text>
            </Center>
        </Pressable>
    )
}