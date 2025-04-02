import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

import { getAuthTokenStorage, removeAuthTokenStorage, saveAuthTokenStorage } from "@storage/storageAuthToken";
import { getUserStorage, removeUserStorage, saveUserStorage } from "@storage/storageUser";
import { useLoading } from "@hooks/useLoading";

export type AuthContextDataProps = {
    user: UserDTO;
    token: string;
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

    const userAndTokenUpdate = async (userData: UserDTO, userToken: string, companyToken: string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        api.defaults.headers.common['Token'] = companyToken;
      
        setUser(userData);
    }

    const saveUserAndTokenStorage = async (userData: UserDTO, token: string) => {
        try {
            setLoading(true);

            await saveUserStorage(userData);
            await saveAuthTokenStorage(token);

        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }

    }

      const signIn = async (username: string, password: string ) => {
        try {
            const { data } = await api.get('/usuario/login', {
                auth: {
                    username: username,
                    password: password
                }
            });
            if(data && data.tokenUsuario) {
                await saveUserAndTokenStorage(data, data.tokenUsuario);
                userAndTokenUpdate(data, data.tokenUsuario);
            }
        } catch (error) {
            throw error;
        } finally { 
            setLoading(false);
        }
        
      }

      const loadUserData = async () => {
        try {
            setLoading(true)
            const userLogged = await getUserStorage();
            const token = await getAuthTokenStorage();

            if (token && userLogged) {
                 userAndTokenUpdate(userLogged, token) 
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
            await removeAuthTokenStorage();
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