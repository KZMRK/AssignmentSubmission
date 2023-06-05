import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ajax from "../../services/fetchService";
import {Button, Col, Container, Row, Form} from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
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
            <Container>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" size="lg" controlId="username">
                            <Form.Label className="fs-3">Username</Form.Label>
                            <Form.Control
                                type="email"
                                value={username}
                                placeholder="Enter your username"
                                onChange={(event) => setUsername(event.target.value)}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="fs-3">Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(event) => setPassword(event.target.value)}
                                size="lg"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col
                        className="mt-2 d-flex flex-column flex-md-row gap-5 justify-content-between"
                        md="8"
                        lg="6"
                    >
                        <Button
                            type="button"
                            id="submit"
                            onClick={() => sendLoginRequest()}
                        >
                            Login
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            id="submit"
                            onClick={() => window.location.href = "/"}
                        >
                            Exit
                        </Button>
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default Login;
