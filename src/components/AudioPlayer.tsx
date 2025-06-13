import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { Text } from '@/components/ui/text';

type AudioPlayerProps = { uri: string };

export function AudioPlayer({ uri }: AudioPlayerProps) {
  // useAudioPlayer já carrega o arquivo e expõe play(), pause() e playing
  const player = useAudioPlayer(uri);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => player.playing ? player.pause() : player.play()}
      >
        <Text style={styles.text}>
          {player.playing ? 'Pausar áudio' : 'Tocar áudio'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1e40af',
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});