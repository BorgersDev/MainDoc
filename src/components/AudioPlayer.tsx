import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Feather } from '@expo/vector-icons';

type AudioPlayerProps = { uri: string };

export function AudioPlayer({ uri }: AudioPlayerProps) {
  const player = useAudioPlayer(uri);
  const status = useAudioPlayerStatus(player);

  const current = status.currentTime ?? 0;
  const total = status.duration ?? 0;
  const progress = total > 0 ? current / total : 0;

  const fmt = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
        <Box className="mt-4 px-4 bg-gray-200 p-5 rounded-lg">
      {/* controle de reprodução e barra de progresso */}
      <HStack className="flex-row items-center mb-2">
        <TouchableOpacity onPress={() => (player.playing ? player.pause() : player.play())}>
          <Feather name={player.playing ? 'pause' : 'play'} size={24} color="#1e40af" />
        </TouchableOpacity>
        <Box className="flex-row w-[80%] h-2 bg-gray-300 rounded-full overflow-hidden ml-3">
          <Box className="bg-primary-600" style={{ flex: progress }} />
          <Box className="bg-gray-300" style={{ flex: 1 - progress }} />
        </Box>
      </HStack>
      {/* indicadores de tempo */}
      <HStack className="flex-row justify-between">
        <Text className="text-sm">{fmt(current)}</Text>
        <Text className="text-sm">{fmt(total)}</Text>
      </HStack>
    </Box>
  );
}
