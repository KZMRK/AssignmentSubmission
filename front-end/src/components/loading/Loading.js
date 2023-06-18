import React from 'react';
import {Container, Spinner} from "react-bootstrap";

const Loading = () => {
    return (
        <Container className="top-0 start-0 end-0 d-flex position-absolute vh-100 justify-content-center align-items-center">
            <Spinner animation="grow" />
        </Container>
    );
};

export default Loading;