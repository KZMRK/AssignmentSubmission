import React, { useContext, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { UserContext } from "../provider/UserProvider";
import ajax from "../../services/fetchService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { jwt, setJwt } = useContext(UserContext);

    function sendLoginRequest() {
        const reqBody = {
            email: username,
            password: password,
        };


        ajax("/api/auth/login", "POST", null, reqBody)
        .then((response) => {
            setJwt(response.token);
            window.location.href = "/dashboard";
        })
        .catch((message) => {
            document.getElementById("invalid-inputs").style.display="block";
        });
    }
    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ height: "90vh" }}
            >
                <Container className="p-5 login-wrapper">
                    <div className="h1 mt-0 text-center login-wrapper-title">SiGN UP</div>
                    <Row>
                        <Col>
                            <div id="invalid-inputs" style={{display: "none"}}>Incorrect username or password</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group
                                className="mb-3"
                                size="lg"
                                controlId="username"
                            >
                                <Form.Label className="fs-5">
                                    Email
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={username}
                                    placeholder="Enter your email"
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    size="lg"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="fs-5">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    size="lg"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col className="mt-2 w-100" md="8" lg="6">
                            <Button
                                type="button"
                                id="submit"
                                size="lg"
                                className="w-100"
                                onClick={() => sendLoginRequest()}
                            >
                                Login
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
};

export default Login;
