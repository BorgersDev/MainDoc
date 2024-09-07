import { Center, Spinner } from "@gluestack-ui/themed";

export const Loading = () => {
    return (
        <Center flex={1} bg="white" >
            <Spinner size={40} color="$blue900" />
        </Center>
    )
}