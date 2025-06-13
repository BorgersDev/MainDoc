import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { Text } from '@/components/ui/text';
import { Feather } from "@expo/vector-icons";

type VideoSectionProps = { uri: string };

export default function VideoSection({ uri }: VideoSectionProps) {
  // inicializa o player e já dá play automaticamente
  const player = useVideoPlayer(uri, p => {
    p.loop = false;
    p.play();
  });

  // monitora o estado de reprodução
  const playingEvent = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });
  const isPlaying = playingEvent?.isPlaying ?? false;

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        allowsFullscreen
        allowsPictureInPicture
      />
      {/* <TouchableOpacity
        onPress={() => (isPlaying ? player.pause() : player.play())}
        style={styles.control}
      >
        <Feather name={isPlaying ? "pause" : "play"} size={24} color={"#9F9BA1"} />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: 'black', // para você ver onde ocupa
  },
  control: {
    marginTop: 10,
  },
});
