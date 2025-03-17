import { createContext, ReactNode, useEffect, useState } from "react";


export type LoadingContextDataProps = {
    isLoading: boolean;
    setLoading: (isTrue: boolean) => void;
}


export const LoadingContext = createContext<LoadingContextDataProps>({} as LoadingContextDataProps);

type LoadingContextProviderProps = {
    children: ReactNode;
}

export const LoadingContextProvider = ({children}: LoadingContextProviderProps) => {
    const [isLoading, setIsLoading ] = useState(false)

    const setLoading = (isTrue: boolean) => {
        {isTrue ? setIsLoading(true) : setIsLoading(false)}
    }

    return (
        <LoadingContext.Provider value={{isLoading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    );

}