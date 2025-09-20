import { createContext } from 'react';
import useGlobalData from '../hooks/useGlobalData.js';

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
    const globalDataController = useGlobalData();

    return (
        <GlobalContext.Provider value={{ ...globalDataController }}>
            {children}
        </GlobalContext.Provider>
    );
}
