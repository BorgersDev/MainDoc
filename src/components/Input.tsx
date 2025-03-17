import { Center } from "@/components/ui/center";
import { FormControl, FormControlErrorText } from "@/components/ui/form-control";
import { Input as GluestackInput, InputField } from "@/components/ui/input";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
  errorMessage?: string | null;
  isInvalid?: boolean;
};

export const Input = ({ isReadOnly = false, isInvalid = false, errorMessage = null, ...rest }: Props) => {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} className="w-full">
      <Center>
        <GluestackInput
          className="bg-gray500 h-12 px-4 border-0 rounded-md focus:border-blue900 invalid:border-error400"
          isReadOnly={isReadOnly}
        >
          <InputField {...rest} placeholderTextColor="gray400" className="text-md text-gray100" />
        </GluestackInput>
        {errorMessage !== null && (
          <FormControlErrorText className="text-gray500 font-heading text-xs"> {errorMessage} </FormControlErrorText>
        )}
      </Center>
    </FormControl>
  );
};