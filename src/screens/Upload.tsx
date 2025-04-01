import { useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Box } from "@/components/ui/box";
import DropdownComponent from "@components/DropdownComponent";
import * as DocumentPicker from "expo-document-picker";

export const Upload = () => {
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0]); // Store selected file
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <VStack className="flex-1">
        <HStack className="pr-6 justify-end">
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <HStack className="gap-1">
              <Feather name="x" size={24} color={"#9F9BA1"} />
            </HStack>
          </TouchableOpacity>
        </HStack>

        <VStack className="flex-1 items-center gap-4">
          {/* Upload Box */}
          <Box
            className="mt-[7%] w-[90%] min-h-[40%] bg-gray-200 rounded-2xl p-4 shadow-md"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -1 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
            }}
          >
            <HStack className="w-full gap-2">
              <DropdownComponent name="Departamento" />
              <DropdownComponent name="Tipo documento" />
            </HStack>

            <VStack className=" flex-1 w-full justify-center items-center">
            
            {!selectedFile ? (
            <TouchableOpacity className="w-[90%] flex-1" onPress={pickDocument}>
              <Box className="justify-center items-center flex-1 border-2 border-dashed border-blueGray-400 rounded-2xl p-4">
                <Feather name="upload" size={30} color={"#075985"} />
                <Text className="font-heading text-lightBlue-800">Adicionar arquivo</Text>
              </Box>
            </TouchableOpacity>)
            : (
              <Box className="mt-15 mx-2 p-2 bg-gray-300 rounded-lg flex-row items-center">
                <Feather name="file" size={22} color={"#075985"} />
                <Text className="ml-2 text-gray-700">{selectedFile.name}</Text>
              </Box>
            )}
            </VStack>
          </Box>

          <Box
            className="w-[90%] h-[45%] bg-gray-200 rounded-2xl shadow-md"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 9,
            }}
          >

          </Box>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};
