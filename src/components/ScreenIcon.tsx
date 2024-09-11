import { Box, Center, Text } from "@gluestack-ui/themed"
import {Feather} from "@expo/vector-icons"



export const ScreenIcon = () => {
    return (
        <Center gap="$2" >
            <Box
                bg="$gray700"
                padding="$4"
                borderRadius="$lg"
                shadowColor="$gray300"
                shadowOffset={{ width: 0, height: 3 }}
                shadowRadius={6}  
                shadowOpacity={0.15}  
            >
                <Feather name="trash" color="#00419d" size={23}/>
            </Box>
            <Text fontFamily="$heading" color="$gray100" fontSize="$xs">Lixeira</Text>
        </Center>
    )
}