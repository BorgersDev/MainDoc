import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import PieChart from 'react-native-pie-chart'
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";

export const ChartCard = () => {
    const documentData = [
        { typeName: 'PDF', color: '#DC2626', quantity: 16 },  // Red
        { typeName: 'DOCUMENTO', color: '#1a91ff', quantity: 2 },  // Light Blue
        { typeName: 'PLANILHA', color: '#22c55e', quantity: 2 },  // Green
        { typeName: 'IMAGEM', color: '#eab308', quantity: 1 },  // Yellow
        { typeName: 'OUTROS', color: '#047857', quantity: 1 }   // Sea Green
    ];

    const series = documentData.map(doc => doc.quantity)
    const sliceColor = documentData.map(doc => doc.color)

    // Use breakpoint value to determine the layout
    const layout = useBreakpointValue { 
        base: 'wrap', // smaller screens
        md: 'row' // larger screens
    });

    return (
        <Card
            size="sm"
            variant="elevated"
            shadowColor="$gray300"
            shadowOffset={{ width: 0, height: 3 }}
            shadowRadius={6}
            shadowOpacity={0.2}
            className="mt-5 mx-[5%] rounded-2xl bg-gray-600">
            <Heading size="sm">Arquivos por tipo</Heading>
            <VStack className="mt-2" >
                <HStack
                    className={` ${layout === 'wrap' ? "flex-row" : "flex-row"} flexWrap-${layout} gap-0.5 items-center `}>
                    {documentData.map((doc, index) => (
                        <HStack
                            key={index}
                            className={` ${layout === 'wrap' && index >= 3 ? "flex-row" : "flex-row"} items-center `}>
                            <Box className={` bg-${doc.color} h-1.5 w-1.5 m-0.5 rounded-[50px] `} />
                            <Text className="font-heading text-center text-gray-100 text-1xs">{doc.typeName}</Text>
                            <Text className="font-heading text-center text-gray-100 text-1xs">- {doc.quantity}</Text>
                        </HStack>
                    ))}
                </HStack>
            </VStack>
            <HStack className="justify-center mt-3">
                <PieChart widthAndHeight={180} series={series} sliceColor={sliceColor} />
            </HStack>
        </Card>
    );
}
