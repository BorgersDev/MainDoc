import { Box, useBreakpointValue } from '@gluestack-ui/themed';
import { Card, Heading, HStack, Text, VStack } from '@gluestack-ui/themed'
import PieChart from 'react-native-pie-chart'

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
    const layout = useBreakpointValue({
        base: 'wrap', // smaller screens
        md: 'row' // larger screens
    });

    return (
        <Card
            mt="$5"
            size="sm"
            variant="elevated"
            mx="5%"
            borderRadius="$2xl"
            shadowColor="$gray300"
            shadowOffset={{ width: 0, height: 3 }}
            shadowRadius={6}
            shadowOpacity={0.2}
            bg="$gray600"
        >
            <Heading size="sm">Arquivos por tipo</Heading>

            <VStack mt="$2" >
                <HStack
                    gap="$0.5"
                    alignItems="center"
                    flexWrap={layout} // Apply the layout based on screen size
                    flexDirection={layout === 'wrap' ? 'row' : 'row'} // Change direction for wrap layout
                >
                    {documentData.map((doc, index) => (
                        <HStack
                            key={index}
                            alignItems="center"
                            flexDirection={layout === 'wrap' && index >= 3 ? 'row' : 'row'} // Break line after 3 items for smaller screens
                        >
                            <Box
                                h="$1.5"
                                w="$1.5"
                                m="$0.5"
                                borderRadius={50}
                                bg={doc.color} 
                            />
                            <Text fontFamily="$heading" textAlign="center" color="$gray100" fontSize="$1xs">{doc.typeName}</Text>
                            <Text fontFamily="$heading" textAlign="center" color="$gray100" fontSize="$1xs">- {doc.quantity}</Text>
                        </HStack>
                    ))}
                </HStack>
            </VStack>

            <HStack justifyContent="center" mt="$3">
                <PieChart widthAndHeight={180} series={series} sliceColor={sliceColor} />
            </HStack>
        </Card>
    )
}
