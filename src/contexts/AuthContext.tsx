import { createContext, ReactNode, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: ( username: string, password: string ) => Promise<void>;
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [ user, setUser] = useState<UserDTO>({} as UserDTO)

      const signIn = async (username: string, password: string ) => {
        try {
            const { data } = await api.get('/usuario/login', {
                auth: {
                    username: username,
                    password: password
                }
            });
            if(data) {
                setUser(data)
            }
        } catch (error) {
            throw error;
        }
        
      }
    return(
        <AuthContext.Provider value={{ user, signIn }}>
                {children}
          </AuthContext.Provider>
    )
}