import React from 'react';
import {Col, Row, Tab} from "react-bootstrap";

const TabBody = (props) => {

    const {users}= props;

    return (
       <>
            <Row>
                <Col>Username</Col>
                <Col>Role</Col>
            </Row>
            {users
            .map(user => (
                <Row key={user.id}>
                    <Col>
                        {user.username}
                    </Col>
                    <Col>
                        {user.authority}
                    </Col>
                </Row>
            ))}
       </>
    );
};

export default TabBody;