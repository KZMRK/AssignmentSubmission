import React from 'react';
import {Col, Row, Tab} from "react-bootstrap";

const TabBody = (props) => {

    const {users}= props;

    return (
       <>
            <Row>
                <Col>First Name</Col>
                <Col>Last Name</Col>
                <Col>Email</Col>
                <Col>Role</Col>
            </Row>
            {users
            .map(user => (
                <Row key={user.id}>
                    <Col>
                        {user.firstName}
                    </Col>
                    <Col>
                        {user.lastName}
                    </Col>
                    <Col>
                        {user.email}
                    </Col>
                    <Col>
                        {user.role}
                    </Col>
                </Row>
            ))}
       </>
    );
};

export default TabBody;