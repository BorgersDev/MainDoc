import { ComponentProps } from "react"

import { ButtonSpinner, Button as GluestackButton, Text,  } from "@gluestack-ui/themed"

type Props = ComponentProps<typeof GluestackButton> & {
    title: string;
    variant?: "dark" | "clear";
    isLoading?: boolean;
} 

export const Button = ({title, variant = "dark" , isLoading = false, ...rest}: Props) => {
    return (
        <GluestackButton 
            w="$full"
            h="$12"
            bg={ variant === "dark" ? "$blue900" : "$gray500" }
            borderWidth="$0"
            rounded="$md"
            $active-bg={ variant === "dark" ? "$blue800" : "$warmGray200" }
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? ( 
                <ButtonSpinner color="$gray700" /> 
             ) : (
                <Text color={variant === "dark" ? "$gray700" : "$gray200"} fontFamily="$heading" fontSize="$md">{title}</Text>
             )
            }
            
        </GluestackButton>
    )
}