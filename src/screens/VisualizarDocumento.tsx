import React from "react";
import { WebView } from "react-native-webview";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps, AppRoutes } from "@routes/app.routes";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { TouchableOpacity, ScrollView, Image, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Feather } from "@expo/vector-icons";
import { Video } from "expo-video";
import { Audio } from "expo-audio";

type VisualizarDocumentoRouteProp = RouteProp<AppRoutes, "VisualizarDocumento">;

export const VisualizarDocumento = () => {
  const route = useRoute<VisualizarDocumentoRouteProp>();
  const navigator = useNavigation<AppNavigationRoutesProps>();

  const { name, mimeType } = route.params;
  const isImageList = "images" in route.params;

  let extension: string | undefined;
  if ("url" in route.params) {
    const match = route.params.url.split("?")[0].split(".").pop();
    extension = match?.toLowerCase();
  }

  const isPDF =
    (mimeType?.includes("pdf") ?? false) || extension === "pdf";

  const videoExtensions = ["mp4", "mov", "m4v", "avi", "webm", "ogg"];
  const audioExtensions = ["mp3", "wav", "ogg", "m4a", "aac", "flac"];

  const isVideo =
    (mimeType?.startsWith("video") ?? false) ||
    (extension ? videoExtensions.includes(extension) : false);
  const isAudio =
    (mimeType?.startsWith("audio") ?? false) ||
    (extension ? audioExtensions.includes(extension) : false);

  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (isAudio && "url" in route.params) {
      let mounted = true;
      let currentSound: Audio.Sound;
      Audio.Sound.createAsync({ uri: route.params.url }).then(({ sound }) => {
        if (mounted) {
          currentSound = sound;
          setSound(sound);
        }
      });
      return () => {
        mounted = false;
        currentSound?.unloadAsync();
      };
    }
  }, [isAudio, route.params]);

  const handlePlayPause = async () => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <VStack className="flex-1 mt-[14%] bg-white">
      <HStack className="pl-2.5 gap-18 items-center justify-between h-[7%] w-[80%]">
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <HStack className="gap-1 items-center">
            <Feather name="arrow-left" size={22} color="gray" />
            <Text className="font-heading text-gray-950">Voltar</Text>
          </HStack>
        </TouchableOpacity>
        <VStack className="items-center justify-center">
          <Text className=" justify-normal items-center font-heading">{name}</Text>
        </VStack>
      </HStack>
      <HStack className="bg-white h-[5%]" />

      {/* PDF */}
      {isPDF && (
        <WebView
          source={{ uri: (route.params as { url: string }).url }}
          originWhitelist={["*"]}
          style={{ flex: 1 }}
          startInLoadingState
        />
      )}

      {/* Vídeo */}
      {isVideo && "url" in route.params && (
        <Video
          source={{ uri: route.params.url }}
          useNativeControls
          resizeMode="contain"
          shouldPlay={false}
          style={{ flex: 1, backgroundColor: "black" }}
        />
      )}

      {/* Áudio */}
      {isAudio && "url" in route.params && (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-lg mb-4">Áudio: {name}</Text>
          <TouchableOpacity onPress={handlePlayPause}>
            <Feather name={isPlaying ? "pause" : "play"} size={40} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {/* Imagens */}
      {isImageList && (
        <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
          {(route.params as { images: { uri: string }[] }).images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img.uri }}
              style={{
                width: "100%",
                height: 400,
                marginBottom: 20,
                resizeMode: "contain",
              }}
            />
          ))}
        </ScrollView>
      )}
    </VStack>
  );
};