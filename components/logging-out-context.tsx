"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface LoggingOutContextProps {
    isLoggingOut: boolean;
    setIsLoggingOut: (isLoggingOut: boolean) => void;
}

const LoggingOutContext = createContext<LoggingOutContextProps | undefined>(undefined);

export const LoggingOutProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    return (
        <LoggingOutContext.Provider value={{ isLoggingOut, setIsLoggingOut }}>
            {children}
        </LoggingOutContext.Provider>
    );
};

export const useLoggingOut = () => {
    const context = useContext(LoggingOutContext);
    if (context === undefined) {
        throw new Error('useLoggingOut must be used within a LoggingOutProvider');
    }
    return context;
};
