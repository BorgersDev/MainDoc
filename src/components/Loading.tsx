import { Spinner } from "@/components/ui/spinner";
import { Center } from "@/components/ui/center";
import { Modal, View, ActivityIndicator } from 'react-native';


export const Loading = () => {
  return (
    <Center className="flex-1 bg-white">
      <Spinner className="text-blue-900 w-10 h-10" />
    </Center>
  );
};