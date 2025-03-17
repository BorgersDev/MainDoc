import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

import { getUserStorage, removeUserStorage, saveUserStorage } from "@storage/storageUser";
import { useLoading } from "@hooks/useLoading";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: ( username: string, password: string ) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [ isLoadingUserStorageData, setIsLoadingUserStorageData ] = useState(true)
    const [ user, setUser] = useState<UserDTO>({} as UserDTO)
    const {setLoading} = useLoading();

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
                saveUserStorage(data)
            }
        } catch (error) {
            throw error;
        }
        
      }

      const loadUserData = async () => {
        try {
            setLoading(true)
            const userLogged = await getUserStorage();

            if (userLogged) {
                 setUser(userLogged);
                 setLoading(false)
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
      }

      const signOut = async () => {
        try {
            setLoading(true);
            setUser({} as UserDTO);
            await removeUserStorage()
        } catch (error) {
            throw error
        } finally  {
            setLoading(false)
        }
      }

      useEffect(() => {
        loadUserData();
      }, []);
    return (
        <AuthContext.Provider value={{ user, signIn, isLoadingUserStorageData, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}