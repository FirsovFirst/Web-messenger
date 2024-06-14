import { HubConnectionBuilder } from "@microsoft/signalr";
import { createContext, useEffect, useState } from "react";

export const ConnectionContext = createContext(null);

export const ConnectionProvider = ({children}) => {
    const [connection, setConnection] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentBuddy, setCurrentBuddy] = useState(null);
    
    useEffect(() => {
        async function con() {
            const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7253/notifyHub")
            .withAutomaticReconnect()
            .build();

            await connection.start();

            setConnection(connection);
        }
        
        con();
    }, []);

    const value = {connection, currentChat, setCurrentChat, currentBuddy, setCurrentBuddy}

    return <ConnectionContext.Provider value={value}>
        {children}
    </ConnectionContext.Provider>
}