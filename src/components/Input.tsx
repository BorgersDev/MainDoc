import { Input as GluestackInput, InputField} from "@gluestack-ui/themed"
import { ComponentProps } from "react"

type Props = ComponentProps<typeof InputField>

export const Input = ({...rest }: Props) => {
    return(
        <GluestackInput 
            bg="$gray700" 
            h="$12"
            px="$4"
            borderWidth="$0"
            borderRadius="$md"
            $focus={{
                borderWidth: 1,
                borderColor: "$blue300"
            }}
        >
            <InputField {...rest} fontSize="$md" color="$gray100" placeholderTextColor="$gray400" />
        </GluestackInput>
    )
}