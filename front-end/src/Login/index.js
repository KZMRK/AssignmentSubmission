import React, {useState} from "react";
import {useLocalState} from "../util/useLocalStorage";
import {Navigate} from "react-router";

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

        fetch("/api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                    if (response.status === 200) {
                        return Promise.all([response.json(), response.headers]);
                    } else {
                        return Promise.reject("Invalid login attempt");
                    }
                }
            )
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                window.location.href = "dashboard";
            }).catch((message) => {
                alert(message)
        });
    }
    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <input type="email" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
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
