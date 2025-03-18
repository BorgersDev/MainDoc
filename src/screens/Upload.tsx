import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import {Feather} from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Box } from "@/components/ui/box";



export const Upload = ( ) => {
    const navigator = useNavigation<AppNavigationRoutesProps>();
    return (
        <SafeAreaView className="flex-1 bg-gray-200">
            <VStack className="flex-1">
                <HStack className="pr-6 justify-end">
                    <TouchableOpacity onPress={() => navigator.goBack()}>
                        <HStack className="gap-1">
                            <Feather name="x" size={24} color="$gray300" />
                        </HStack>
                    </TouchableOpacity>
             </HStack>
             <VStack className="flex-1 items-center gap-2">
                <Box
                    className="mt-[7%] w-[90%] h-[40%] bg-gray-200 rounded-2xl"
                    style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -1 }, // Moves shadow upwards
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    }}
                >
                    <TouchableOpacity className="flex-1 m-12">
                        <Box className=" justify-center items-center flex-1 border-2 border-dashed border-blue-950  rounded-2xl "  >
                            <Feather name="upload" size={30} color={"#00419d"}/>
                            <Text className="font-heading color-blue-950">Adicionar arquivo</Text>
                        </Box>
                    </TouchableOpacity>
                </Box>

                <Box
                    className="mt-[7%] w-[90%] h-[45%] bg-gray-200 rounded-2xl"
                    style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 }, // Moves shadow downwards
                    shadowOpacity: 0.3,
                    shadowRadius: 9,
                    }}
                />
                </VStack>
            </VStack>
        </SafeAreaView>
    );
}