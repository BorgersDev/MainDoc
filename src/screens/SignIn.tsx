import { Center, Heading, HStack, ScrollView, Text, VStack, useToast } from "@gluestack-ui/themed"


import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { Logo } from "@components/Logo"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigationRoutesProps } from "@routes/auth.routes"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppError } from "@utils/AppError"
import { ToastMessage } from "@components/ToastMessage"
import { useAuth } from "@hooks/useAuth"
import { useState } from "react"

type FormDataProps = {
    username: string;
    password: string;
}

const signUpSchema = yup.object({
    username: yup.string().required("Informe o username"),
    password: yup.string().required("Informe a senha")
})



export const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false)

    const { signIn } = useAuth();

    const toast = useToast();

    const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const navigator = useNavigation<AuthNavigationRoutesProps>();

    const handleSignIn = async ({username, password}: FormDataProps) => {
        try {
            setIsLoading(true)
            await signIn(username, password)
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message: 'Erro de autenticação, tente novamente mais tarde.'

            setIsLoading(false)

            toast.show({
                placement: 'top',
                render: ({id}) => (
                    <ToastMessage
                        id={id}
                        title={title}
                        onClose={() => toast.close(id)}
                        action="error"
                    />
                )
            });
        } 
    }

    const handleNewAccount = () => {
        navigator.navigate("signUp")
    }
    return (
        <ScrollView 
            w="$full"
            contentContainerStyle={{ flexGrow: 1}} 
            showsVerticalScrollIndicator={false} 
            automaticallyAdjustKeyboardInsets 
            bounces={false}
            $active-alignItems="center"
        >
            <VStack w="$full" flex={1} bg="$gray700"  >
                <VStack w="$full" flex={1} px="$12" pb="$16" bg="$gray600" rounded="$3xl">

                    <Center  my="$33">
                        <Logo />
                    </Center>

                    <Center  gap="$2">
                        <Heading fontSize="$md" > Acesse sua conta </Heading>

                        <Controller 
                            control={control}
                            name="username"
                            render={({field: { onChange, value }}) => (
                                <Input placeholder="Username" autoCorrect={false} autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.username?.message} />
                            )}                        
                        />
                        <Controller 
                            control={control}
                            name="password"
                            render={({field: { onChange, value }}) => (
                                <Input placeholder="Senha" autoCapitalize="none" autoCorrect={false} secureTextEntry onChangeText={onChange} value={value} errorMessage={errors.password?.message} />
                            )}                        
                        />


                        <Button title="Entrar" my="$14" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
                    </Center>

                </VStack>
                
                <Center h="$56" flex={1} px="$12">
                    <Heading fontSize="$sm" fontFamily="$heading" >Ainda não tem acesso? </Heading>

                    <Button title="Crie uma conta" variant="clear" onPress={handleNewAccount} />
                </Center>
            </VStack>
        </ScrollView>
    )
}