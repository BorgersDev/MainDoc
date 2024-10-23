import {
    ToastDescription,
    ToastTitle,
    Toast,
    Pressable,
    Icon,
    VStack,
    HStack
} from "@gluestack-ui/themed"
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
            bgColor={action === "success" ? "$green500" : "$error700"} 
            mt="$10"
            
        >
            <VStack space="xs" w="$full" >
                <HStack justifyContent="space-between">
                    <VStack>
                        
                        <ToastTitle color="$white" fontFamily="$heading">
                            {title}
                        </ToastTitle>
                        {description && (
                            <ToastDescription color="$white" fontFamily="$body" >
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
    )
}