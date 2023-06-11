import React, {useContext, useState} from 'react';
import {useParams} from "react-router";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import ajax from "../../services/fetchService";
import {UserContext} from "../provider/UserProvider";

const UserView = () => {
    const {jwt, setJwt} = useContext(UserContext);
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        authority: ""
    });
    function registerUser() {
        ajax("/api/auth/register", "POST", jwt, user)
        .then((response) => {
            window.location.href="/dashboard";
        })
    }

    function updateUser(prop, value) {
        const newUser = {...user};
        newUser[prop] = value;
        setUser(newUser);
    }

    return (
        <Form className="justify-content-center mt-3" as={Container} style={{maxWidth: "40em"}}>
            <Form.Group  as={Row} className="mb-3">
                <Col>
                    <Form.Label>Email address</Form.Label>
                </Col>
                <Col>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => updateUser("email", e.target.value)}
                        value={user.email}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col>
                    <Form.Label>Username</Form.Label>
                </Col>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => updateUser("username", e.target.value)}
                        value={user.username}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col>
                    <Form.Label>Password</Form.Label>
                </Col>
                <Col>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => updateUser("password", e.target.value)}
                        value={user.password}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col>
                    <Form.Label>Role</Form.Label>
                </Col>
                <Col>
                    <Form.Select onChange={(e) => updateUser("authority", e.target.value)} aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="STUDENT_ROLE">Student</option>
                        <option value="CODE_REVIEWER_ROLE">Code reviewer</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Button onClick={() => registerUser()} variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
};

export default UserView;