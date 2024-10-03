import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { Logo } from "@components/Logo"
import { Center, Heading, HStack, Text, ScrollView, VStack } from "@gluestack-ui/themed"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigationRoutesProps } from "@routes/auth.routes"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"


type FormDataProps = {
    cpf: string;
    username: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    cpf: yup.string().required("Informe o CPF"),
    username: yup.string().required("Informe o Username"),
    email: yup.string().required("Informe o E-mail").email("E-mail inválido"),
    password: yup.string().required("Informe a senha").min(6, "6 dígitos mínimos"),
    password_confirm: yup.string().required("Confirme a senha").oneOf([yup.ref("password"), ""], "Está diferente da senha")
})



export const SignUp = () => {

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const navigator = useNavigation<AuthNavigationRoutesProps>();

    const handleGoBack = () => {
        navigator.goBack()
    }

    const handleSignUp = (data: FormDataProps) => {
        console.log(data)
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
                <VStack w="$full" flex={1} px="$12"  bg="$gray600" rounded="$3xl">

                    <Center  my="$33">
                        <Logo />
                    </Center>

                    <Center  my="-$14" gap="$2">
                        <Heading fontSize="$md" > Crie sua conta </Heading>

                        <Controller 
                            control={control}
                            name="cpf"
                            render={({field: { onChange, value }}) => (
                                <Input placeholder="CPF" autoCorrect={false} keyboardType="number-pad" onChangeText={onChange} value={value} errorMessage={errors.cpf?.message} />
                            )}                        
                        />

                        <Controller 
                            control={control}
                            name="username"
                            rules={{
                                required: "Informe o Username"
                            }}
                            render={({field: { onChange, value }}) => (
                                <Input placeholder="Username" autoCorrect={false} onChangeText={onChange} value={value} errorMessage={errors.username?.message} />
                            )}                        
                        />

                        <Controller 
                            control={control}
                            name="email"
                            render={({field: { onChange, value }}) => (
                                <Input placeholder="E-mail" autoCorrect={false} keyboardType="email-address" autoCapitalize="none" onChangeText={onChange} value={value} errorMessage={errors.email?.message} />
                            )}                        
                        />
                        
                        <Controller 
                            control={control}
                            name="password"
                            render={({field: { onChange, value }}) => (
                                <Input placeholder="Senha" autoCapitalize="none" autoCorrect={false} secureTextEntry onChangeText={onChange} value={value} errorMessage={errors.password?.message} />
                            )}                        
                        />
                        
                        <Controller 
                            control={control}
                            name="password_confirm"
                            rules={{required: "Confirme a senha"}}
                            render={({field: { onChange, value }}) => (
                                <Input placeholder="Confirmar senha" autoCapitalize="none" autoCorrect={false} secureTextEntry onChangeText={onChange} onSubmitEditing={handleSubmit(handleSignUp)} value={value} errorMessage={errors.password_confirm?.message} />
                            )}                        
                        />

                        <Button title="Criar e acessar" my="$12" onPress={handleSubmit(handleSignUp)} />
                    </Center>

                </VStack>
                
                <Center h="$40" flex={1} px="$12">
                    <Heading fontSize="$sm" fontFamily="$heading" >Já possui uma conta? </Heading>

                    <Button title="Faça Login" variant="clear" onPress={handleGoBack} />
                </Center>
            </VStack>
        </ScrollView>
    )
}