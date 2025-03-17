import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { ScrollView } from "@/components/ui/scroll-view";
import { Center } from "@/components/ui/center";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Logo } from "@components/Logo";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";

import { LinearGradient } from "expo-linear-gradient";

type FormDataProps = {
  username: string;
  password: string;
};

const signUpSchema = yup.object({
  username: yup.string().required("Informe o username"),
  password: yup.string().required("Informe a senha"),
});

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigator = useNavigation<AuthNavigationRoutesProps>();

  const handleSignIn = async ({ username, password }: FormDataProps) => {
    try {
      setIsLoading(true);
      await signIn(username, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Erro de autenticação, tente novamente mais tarde.";

      setIsLoading(false);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            onClose={() => toast.close(id)}
            action="error"
          />
        ),
      });
    }
  };

  const handleNewAccount = () => {
    navigator.navigate("signUp");
  };

  return (
    <LinearGradient colors={["#003B8D", "#001738"]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
        bounces={false}
        className="w-full h-full"
      >
        <VStack className="flex-1 w-full px-12">
          <Center className="my-28">
            <Logo />
          </Center>

          <Center className="gap-4 w-full mt-10">
            <VStack className="items-center pb-5">
              <Text className="text-2xl text-gray700 font-heading">Acesse sua conta  </Text>
              <Text className="text-gray700 text-sm"> Informe o username e a senha para login </Text>
            </VStack>

            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Username"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.username?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              title="Logar "
              className="my-14 h-12 w-full bg-blue-900"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Center>
        </VStack>
      </ScrollView>
    </LinearGradient>
  );
};
