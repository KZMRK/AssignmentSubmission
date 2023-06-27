import React, {useState} from "react";

import { createContext } from "react";

const PopoutContext= createContext("");

const PopoutProvider = ({ children }) => {
    const [show, setShow] = useState(false);

    return (
        <PopoutContext.Provider value={{ show, setShow }}>
            {children}
        </PopoutContext.Provider>
    );
};

export { PopoutContext, PopoutProvider };
