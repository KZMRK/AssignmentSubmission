import React from "react";
import { useLocalState } from "../../util/useLocalStorage";
import { createContext } from "react";

const UserContext= createContext("");

const UserProvider = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return (
        <UserContext.Provider value={{ jwt, setJwt }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
