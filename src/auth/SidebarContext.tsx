import React, { createContext, useContext, useState } from 'react';

// Define the type for the context value
type SidebarContextType = {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the context with the initial value as undefined and assert the type
const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider: React.FC<{ children: any }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};