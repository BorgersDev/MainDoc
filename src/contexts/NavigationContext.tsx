import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextProps {
  isTabScreen: boolean;
  setIsTabScreen: (value: boolean) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [isTabScreen, setIsTabScreen] = useState(true);

  return (
    <NavigationContext.Provider value={{ isTabScreen, setIsTabScreen }}>
      {children}
    </NavigationContext.Provider>
  );
}; 

export const useNavigationStateContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationStateContext must be used within a NavigationProvider');
  }
  return context;
};