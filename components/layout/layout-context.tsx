import React, { createContext, useContext, ReactNode } from 'react';

interface LayoutContextType {
  theme: {
    color?: 'blue' | 'teal' | 'green' | 'red' | 'pink' | 'purple' | 'orange' | 'yellow';
  };
}

const LayoutContext = createContext<LayoutContextType>({ theme: {} });

interface LayoutProviderProps {
  children: ReactNode;
  theme?: {
    color?: 'blue' | 'teal' | 'green' | 'red' | 'pink' | 'purple' | 'orange' | 'yellow';
  };
}

export function LayoutProvider({ children, theme = {} }: LayoutProviderProps) {
  return (
    <LayoutContext.Provider value={{ theme }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}