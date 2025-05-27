import React from "react";
import { WebView } from "react-native-webview";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps, AppRoutes } from "@routes/app.routes";
import { VStack } from "@/components/ui/vstack";
import { Header } from "@components/Header";
import { HStack } from "@/components/ui/hstack";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Feather } from "@expo/vector-icons";

type VisualizarDocumentoRouteProp = RouteProp<AppRoutes, "VisualizarDocumento">;

export const VisualizarDocumento = () => {
  const route = useRoute<VisualizarDocumentoRouteProp>();
  const navigator = useNavigation<AppNavigationRoutesProps>();

  const { url, name } = route.params;

  return (
    <VStack className="flex-1  mt-[14%]">
      <HStack className=" pl-2.5  gap-18 items-center justify-between h-[7%] w-[80%]">
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <HStack className=" gap-1 items-center">
            <Feather
              className=""
              name="arrow-left"
              size={22}
              color="gray-300"
            />
            <Text className="font-heading text-gray-950">Voltar</Text>
          </HStack>
        </TouchableOpacity>

        <VStack>
          <Text className="font-heading">{name}</Text>
        </VStack>
      </HStack>
      <HStack className="bg-white h-[5%]" />

      <WebView  source={{ uri: url }} style={{ flex: 1 }} startInLoadingState />
    </VStack>
  );
};
