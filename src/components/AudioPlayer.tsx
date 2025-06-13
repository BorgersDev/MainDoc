import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Text } from '@/components/ui/text';
import { Feather } from "@expo/vector-icons";

type AudioPlayerProps = { uri: string };

export function AudioPlayer({ uri }: AudioPlayerProps) {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);

  // tempos em segundos
  const current = status.currentTime ?? 0;
  const total = status.duration ?? 0;
  const progress = total > 0 ? current / total : 0;

  const fmt = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      {/* barra de progresso */}
      <View style={styles.progressBar}>
        <View style={[styles.fill, { flex: progress }]} />
        <View style={[styles.remain, { flex: 1 - progress }]} />
      </View>
      {/* tempos */}
      <View style={styles.timeRow}>
        <Text>{fmt(current)}</Text>
      </View>
      {/* play/pause */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => (player.playing ? player.pause() : player.play())}
      >
            <Feather name={status.playing ? "pause" : "play"} size={24} color={"#9F9BA1"} />

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  progressBar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  fill: {
    backgroundColor: '#1e40af',
  },
  remain: {
    backgroundColor: '#ccc',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1e40af',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});