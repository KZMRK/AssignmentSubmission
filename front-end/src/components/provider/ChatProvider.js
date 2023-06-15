import React, {useState} from "react";

import { createContext } from "react";

const ChatContext= createContext("");

const ChatProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);

    return (
        <ChatContext.Provider value={{ stompClient, setStompClient }}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatProvider };
