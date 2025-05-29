import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

import { getAuthTokenStorage, removeAuthTokenStorage, saveAuthTokenStorage, saveCompanyTokenStorage, getAuthCompanyTokenStorage, saveAuthorization64Storage, getAuthorization64Storage, removeAuthCompanyTokenStorage, removeAuthorization64Storage } from "@storage/storageAuthToken";
import { getUserStorage, removeUserStorage, saveUserStorage } from "@storage/storageUser";
import { useLoading } from "@hooks/useLoading";
import { set } from "@gluestack-style/react";

export type AuthContextDataProps = {
    user: UserDTO;
    token: string;
    signIn: ( username: string, password: string ) => Promise<void>;
    signOut: () => Promise<void>;
    switchComp: ( codigoEmpresa: number ) => Promise<void>;
    isLoadingUserStorageData: boolean;
    empresaConfirmada: boolean;
    setEmpresaConfirmada: (value: boolean) => void;
    umaEmpresa: boolean;
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [ isLoadingUserStorageData, setIsLoadingUserStorageData ] = useState(true)
    const [ user, setUser] = useState<UserDTO>({} as UserDTO)
    const [ empresaConfirmada, setEmpresaConfirmada ] = useState(false)
    const [ umaEmpresa, setUmaEmpresa ] = useState(false);
    const {setLoading} = useLoading();


    const userAndTokenUpdate = async (userData: UserDTO, userToken: string, companyToken: string, basicAuthHeader: string) => {
        api.defaults.headers.common['Authorization'] = basicAuthHeader;
        api.defaults.headers.common['token'] = companyToken;
        delete api.defaults.headers.common['Content-Type'];
      
        setUser(userData);
    }

    const saveUserAndTokenStorage = async (userData: UserDTO, token: string, companyToken: string, basicAuthHeader: string) => {
        try {
            setLoading(true);

            await saveUserStorage(userData);
            await saveAuthTokenStorage(token);
            await saveCompanyTokenStorage(companyToken);
            await saveAuthorization64Storage(basicAuthHeader);

        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }

    }

      const signIn = async (username: string, password: string) => {
  try {
    const response = await api.get('/usuario/login', {
      auth: {
        username: username,
        password: password,
      },
    });

    const basicAuthHeader = 'Basic ' + btoa(`${username}:${password}`);
    const { data } = response;

    if (data && data.tokenUsuario && data.tokenEmpresa && basicAuthHeader) {
      await saveUserAndTokenStorage(data, data.tokenUsuario, data.tokenEmpresa, basicAuthHeader);
      await userAndTokenUpdate(data, data.tokenUsuario, data.tokenEmpresa, basicAuthHeader);

      if (data.empresaVOs.length === 1) {
        setUmaEmpresa(true);
        const unicaEmpresa = data.empresaVOs[0].codigo;
        await switchComp(unicaEmpresa);
        setEmpresaConfirmada(true);
      }
    }
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
       
      const switchComp = async ( codigoEmpresa: number ) => {
        try {
            const companyToken = await getAuthCompanyTokenStorage();
            const authorization64 = await getAuthorization64Storage();

            const response = await api.get(`/usuario/trocarEmpresa/${codigoEmpresa}`, {
                headers: {
                    token: companyToken,
                    Authorization: authorization64
                }
            });
            const { data } = response;
            if(data && data.tokenUsuario && data.tokenEmpresa && authorization64) {
                await saveUserAndTokenStorage(data, data.tokenUsuario, data.tokenEmpresa, authorization64 );
                await userAndTokenUpdate(data, data.tokenUsuario, data.tokenEmpresa, authorization64);
            }
        } catch (error) {
            throw error;
        } finally { 
            setLoading(false);
            setEmpresaConfirmada(true);
        }
        
      }

     const loadUserData = async () => {
  try {
    setLoading(true);
    const userLogged = await getUserStorage();
    const token = await getAuthTokenStorage();
    const companyToken = await getAuthCompanyTokenStorage();
    const authorization64 = await getAuthorization64Storage();

    if (token && userLogged && companyToken && authorization64) {
      await userAndTokenUpdate(userLogged, token, companyToken, authorization64);

      if (userLogged.empresaVOs.length === 1) {
        const unicaEmpresa = userLogged.empresaVOs[0].codigo;

        await switchComp(unicaEmpresa);
        setEmpresaConfirmada(true);
      }
      if (userLogged.empresaVOs.length > 1) {
        setUmaEmpresa(false);
      }
    }
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};

      const signOut = async () => {
        try {
            setLoading(true);
            setUser({} as UserDTO);
            await removeUserStorage()
            await removeAuthTokenStorage();
            await removeAuthCompanyTokenStorage();
            await removeAuthorization64Storage();
            setEmpresaConfirmada(false)
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
        <AuthContext.Provider value={{ user, signIn, isLoadingUserStorageData, signOut, switchComp, setEmpresaConfirmada, empresaConfirmada, umaEmpresa }}>
            {children}
        </AuthContext.Provider>
    );
}