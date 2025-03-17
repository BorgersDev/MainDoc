import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Image } from "@/components/ui/image";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Feather } from "@expo/vector-icons";

type Props = {
    name: string
}

export const DocumentCard = ({name}: Props) => {
    return (
        <Card>
            <HStack className="gap-2">
               <Image 
                   source={{uri: "https://cdn.jotfor.ms/templates/screenshot/pdf-templates/modelo-de-atestado-medico.png?w=310&v=1768020921" }}
                   alt="pdf"
                   className="rounded-[5px]"
               />
               <VStack className="items-center gap-2">
                   <Heading className="text-sm" >{name}</Heading>
                   <HStack className="gap-2.5">
                       <Button
                           className="bg-gray-300 max-w-10 px-2.5 rounded-lg items-center  active:bg-gray-400">
                           <Feather name="file" color="#F7F7F8" size={17} />    
                       </Button> 
                       <Button
                           className="bg-lime-600  active:bg-lime-500 max-w-10 px-2.5 rounded-lg items-center">
                           <Feather name="edit" color="#F7F7F8" size={17} />    
                       </Button> 
                       <Button
                           className="bg-primary-500  active:bg-primary-400 max-w-10 px-2.5 rounded-lg items-center">
                           <Feather name="key" color="#F7F7F8" size={17} />    
                       </Button> 
                       <Button
                           className="bg-error-600  active:bg-error-500 max-w-10 px-2.5 rounded-lg items-center">
                           <Feather name="trash-2" color="#F7F7F8" size={17} />    
                       </Button> 
                   </HStack>
               </VStack>
           </HStack>
        </Card>
    );
}