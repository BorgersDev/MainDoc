import { Text } from "@/components/ui/text";
import { ButtonSpinner, Button as GluestackButton } from "@/components/ui/button";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GluestackButton> & {
  title?: string;
  variant?: "dark" | "clear";
  isLoading?: boolean;
};

export const Button = ({ title, variant = "dark", isLoading = false, ...rest }: Props) => {
  return (
    <GluestackButton
      className={`rounded-3xl border-0 text-lg
        ${variant === "dark" ? "bg-blue100 active:bg-blue200" : "bg-gray100 active:bg-gray200"}`
      }
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner className="text-gray500 w-6 h-6" />
      ) : (
        <Text className={`${variant === "dark" ? "text-gray500" : "text-gray100"} font-heading text-lg`}> 
          {title} 
        </Text>
      )}
    </GluestackButton>
  );
};