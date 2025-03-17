import { Text } from "@/components/ui/text";
import { ComponentProps, useState } from "react";
import { Button, TouchableOpacity } from "react-native";
type Props = ComponentProps<typeof Button> & {
  title: string;
  isActive: boolean;
};

export const Departamentos = ({ title, isActive, ...rest }: Props) => {
    const [isPressed, setPressed ] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.7} // Controls the fade effect
      style={{
        minWidth: 96,
        height: 35,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isActive ? "#fff" : "#F7F7F8",
        borderWidth: isActive ? 1 : 0,
        borderColor: "#00419d",
        marginHorizontal: 3
      }}
      {...rest}
    >
      <Text className={`uppercase text-xs font-heading ${isActive ? "text-blue-950" : "text-gray200"}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};