import {Feather} from "@expo/vector-icons"
import { Departamento } from "@screens/Departamento";


export const icon = {
    Home: (props: any) => (
        <Feather name='home' size={24} {...props} />
      ),
      Arquivos: (props: any) => (
        <Feather name='archive' size={24} {...props} />
      ),
      Usuário: (props: any) => (
        <Feather name='user' size={24} {...props} />
      ),
      Departamento: (props: any) => (
        <Feather name='hard-drive' size={24} {...props} />
      ),
      Empresa: (props: any) => (
        <Feather name='briefcase' size={24} {...props} />
      ),
      Licenca: (props: any) => (
        <Feather name='file-text' size={24} {...props} />
      ),
      TipoDeDocumento: (props: any) => (
        <Feather name='file' size={24} {...props} />
      ),
      Lixeira: (props: any) => (
        <Feather name='trash' size={24} {...props} />
      ),
      PerfilDeUsuario: (props: any) => (
        <Feather name='user-check' size={24} {...props} />
      ),
};