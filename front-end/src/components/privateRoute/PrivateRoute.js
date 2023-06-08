import React, {useContext, useState} from "react";
import {useLocalState} from "../../util/useLocalStorage";
import {Navigate} from "react-router";
import ajax from "../../services/fetchService";
import {UserContext} from "../provider/UserProvider";

const PrivateRoute = ({ children }) => {
    const {jwt, setJwt} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    if (jwt) {
        ajax(`/api/auth/validate?token=${jwt}`, "GET", jwt)
        .then(isValid => {
            setIsLoading(false);
            setIsValid(isValid);
        })
    } else {
        return <Navigate to="/login"/>;
    }

    return isLoading ? <div>Loading</div> : isValid ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;
