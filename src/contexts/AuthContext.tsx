import { createContext, ReactNode } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO;
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    return(
        <AuthContext.Provider value={{
            user : {
              "nome": "Junior Junior",
               "codigoEmpresa": 1,
               "nomeEmpresa" : "MainDoc"
            }
          }}>
                {children}
          </AuthContext.Provider>
    )
}