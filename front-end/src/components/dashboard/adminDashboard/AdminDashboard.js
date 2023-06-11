import React, {useContext, useEffect, useState} from 'react';
import ajax from "../../../services/fetchService";
import {UserContext} from "../../provider/UserProvider";
import Loading from "../../loading/Loading";
import {Button, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import TabBody from "./TabBody";

const AdminDashboard = () => {
    const {jwt, setJwt} = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [key, setKey] = useState('Students');

    useEffect(() => {
        ajax("/api/users", "GET", jwt)
        .then((users) => {
                setUsers(users);
            }
        )
    }, [])

    function createUser() {
        const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), -1);
        const userId = maxId + 1;
        window.location.href=`/users/${userId}`;
    }

    return (
        <Container>
            <Button className="my-3" onClick={() => createUser()}>Add user</Button>
            <Tabs
                defaultActiveKey="reviewer"
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="students" title="Students">
                    <TabBody users={users.filter(user => user.authority === "ROLE_STUDENT")}/>
                </Tab>
                <Tab eventKey="reviewer" title="Reviewers">
                    <TabBody users={users.filter(user => user.authority === "ROLE_CODE_REVIEWER")}/>
                </Tab>
                <Tab eventKey="admins" title="Admins">
                    <TabBody users={users.filter(user => user.authority === "ROLE_ADMIN")} />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default AdminDashboard;