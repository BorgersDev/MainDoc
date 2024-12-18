import { Box, Button, Card, Center, Heading, HStack, Image, Input, Text, VStack } from "@gluestack-ui/themed";
import { Feather } from "@expo/vector-icons";

type Props = {
    name: string
}

export const DocumentCard = ({name}: Props) => {
    return (
        <Card>
         <HStack gap="$2">
            <Image 
                source={{uri: "https://cdn.jotfor.ms/templates/screenshot/pdf-templates/modelo-de-atestado-medico.png?w=310&v=1768020921" }}
                alt="pdf"
                borderRadius={5}
            />
            <VStack alignItems="center" gap="$2" >
                <Heading fontSize="$sm" >{name}</Heading>
                <HStack gap="$2.5">
                    <Button
                        bg="$gray300"
                        maxWidth="$10"
                        px="$2.5"
                        borderRadius="$lg"
                        alignItems="center"
                        $active-bgColor="$gray400"
                    >
                        <Feather name="file" color="#F7F7F8" size={17} />    
                    </Button> 
                    <Button
                        bg="$lime600"
                        $active-bgColor="$lime500"
                        maxWidth="$10"
                        px="$2.5"
                        borderRadius="$lg"
                        alignItems="center"
                    >
                        <Feather name="edit" color="#F7F7F8" size={17} />    
                    </Button> 
                    <Button
                        bg="$primary500"
                        $active-bgColor="$primary400"
                        maxWidth="$10"
                        px="$2.5"
                        borderRadius="$lg"
                        alignItems="center"
                    >
                        <Feather name="key" color="#F7F7F8" size={17} />    
                    </Button> 
                    <Button
                        bg="$error600"
                        $active-bgColor="$error500"
                        maxWidth="$10"
                        px="$2.5"
                        borderRadius="$lg"
                        alignItems="center"
                    >
                        <Feather name="trash-2" color="#F7F7F8" size={17} />    
                    </Button> 
                </HStack>
            </VStack>
        </HStack>
    </Card>
    )
}