import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ajax from "../../services/fetchService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
        console.log("I'm sending a request");

        const reqBody = {
            username: username,
            password: password,
        };

        ajax("/api/auth/login", "POST", null, reqBody)
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                window.location.href = "dashboard";
            })
            .catch((message) => {
                alert(message);
            });
    }
    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="email"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <button
                    type="button"
                    id="submit"
                    onClick={() => sendLoginRequest()}
                >
                    Ввійти
                </button>
            </div>
        </>
    );
};

export default Login;
