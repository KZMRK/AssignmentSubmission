import React, { useContext, useState } from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { UserContext } from "../provider/UserProvider";
import jwt_decode from "jwt-decode";
import logo from '../../img/logo.png'
import {BiLogIn, BiLogOut} from "react-icons/bi";
import {useNavigate} from "react-router-dom";

const Navigation = () => {
    const { jwt, setJwt } = useContext(UserContext);
    const [username, setUsername] = useState(jwt ? jwt_decode(jwt).fullName : "");
    const navigate = useNavigate();

    return (

            <Navbar sticky="top" collapseOnSelect expand="md" bg="dark" variant="dark" className="custom-navbar">
                <Container>
                    <Navbar.Brand href="/dashboard">
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top mr-4"
                            alt="Assignment Submission Logo"
                        />
                        Code Crafters
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        </Nav>
                        <Nav>
                            {jwt ? (
                                <>
                                    <NavDropdown title={`Signed in as: ${username}`} id="collasible-nav-dropdow">
                                        <NavDropdown.Item onClick={() => {
                                            setJwt(null);
                                            navigate("/login");
                                        }}>
                                            Log out <BiLogOut/>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <Nav.Link eventKey={2}
                                    onClick={() => {
                                        window.location.href = "/login";
                                    }}
                                >
                                    Log in <BiLogIn/>
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    );
};

export default Navigation;
