import React from "react";
import { WebView } from "react-native-webview";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps, AppRoutes } from "@routes/app.routes";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { TouchableOpacity, ScrollView, Image, View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { Feather } from "@expo/vector-icons";
import { AudioPlayer } from "@components/AudioPlayer";
import VideoSection from "@components/VideoSection";
export const VisualizarDocumento = () => {
  const route = useRoute<RouteProp<AppRoutes, 'VisualizarDocumento'>>();
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const params = route.params as
    | { url: string; name: string }
    | { images: { uri: string }[]; name: string }
    | { mediaUri: string; mimeType: string; name: string };

  const isPDF = 'url' in params;
  const isImageList = 'images' in params;
  const isMedia = 'mediaUri' in params;

  return (
    <VStack className="flex-1 mt-[14%]">
      {/* Header */}
      <HStack style={styles.header}>
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <HStack className="gap-1 items-center">
            <Feather name="arrow-left" size={22} color="gray" />
            <Text className="font-heading text-gray-950">Voltar</Text>
          </HStack>
        </TouchableOpacity>
        <Text className="font-heading">{params.name}</Text>
      </HStack>

      {/* PDF */}
      {isPDF && (
        <WebView
          source={{ uri: (params as { url: string }).url }}
          originWhitelist={["*"]}
          style={styles.flex}
          startInLoadingState
        />
      )}

      {/* Imagens */}
      {isImageList && (
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {(params as { images: { uri: string }[] }).images.map((img, idx) => (
            <Image
              key={idx}
              source={{ uri: img.uri }}
              style={styles.image}
            />
          ))}
        </ScrollView>
      )}

      {/* Vídeo ou Áudio */}
      {isMedia && (
        <View style={styles.mediaContainer}>
          {params.mimeType.startsWith('video') ? (
            <VideoSection uri={params.mediaUri} />
          ) : (
            <AudioPlayer uri={params.mediaUri} />
          )}
        </View>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    paddingLeft: 10,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  contentContainer: { padding: 16 },
  image: { width: '100%', height: 400, marginBottom: 20, resizeMode: 'contain' },
  mediaContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
