import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { ToastDescription, ToastTitle, Toast } from "@/components/ui/toast";
import {Feather} from "@expo/vector-icons"

type Props = {
    id: string;
    title: string;
    description?: string;
    action?: "error" | "success";
    onClose: () => void

}
export const ToastMessage = ({id, title, description, action="success", onClose}: Props) => {
    return (
        <Toast
            nativeID={`toast-${id}`}
            action={action}
            className={` ${action === "success" ? "bg-green-500" : "bg-error-700"} mt-10 `}>
            <VStack space="xs" className="w-full" >
                <HStack className="justify-between">
                    <VStack>
                        
                        <ToastTitle className="text-white font-heading">
                            {title}
                        </ToastTitle>
                        {description && (
                            <ToastDescription className="text-white font-body">
                                {description}
                            </ToastDescription>
                        )}
                    </VStack>
                    <Pressable  onPress={onClose} >
                    <Feather name='x' size={24} color="#f9fafb"/>
                    </Pressable>
                </HStack>
            </VStack>
        </Toast>
    );
}