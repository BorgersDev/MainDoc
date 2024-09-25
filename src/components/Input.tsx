import { Input as GluestackInput, InputField, FormControl, FormControlErrorText, Center} from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type Props = ComponentProps<typeof InputField> & {
    isReadOnly?: boolean;
    errorMessage?: string | null;
    isInvalid?: boolean;
}

export const Input = ({isReadOnly = false,isInvalid = false , errorMessage = null, ...rest }: Props) => {
    const invalid = !!errorMessage || isInvalid
    return(
        <FormControl isInvalid={invalid} w="$full">
            <Center>
                <GluestackInput 
                    bg="$gray700" 
                    h="$12"
                    px="$4"
                    borderWidth={invalid ? "$1" : "$0"}
                    borderColor={invalid && "$error400" }
                    borderRadius="$md"
                    isReadOnly={isReadOnly}
                    $focus={{
                        borderWidth: 1,
                        borderColor: "$blue300"
                    }}
                >
                    <InputField {...rest} fontSize="$md" color="$gray100" placeholderTextColor="$gray400" />
                </GluestackInput>
                { errorMessage !== null && <FormControlErrorText color="$error600" fontFamily="$heading" fontSize="$xs" > {errorMessage} </FormControlErrorText>}
            </Center>
        </FormControl>
    )
}