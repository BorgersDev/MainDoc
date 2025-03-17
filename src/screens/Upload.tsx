import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import {Feather} from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";



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
                <Center className="flex-1">
                    <Text className="font-heading text-lg">Upload Screen</Text>
                </Center>
            </VStack>
        </SafeAreaView>
    );
}