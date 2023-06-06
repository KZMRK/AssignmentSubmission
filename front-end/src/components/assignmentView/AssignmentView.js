import React, { useEffect, useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ajax from "../../services/fetchService";
import {Badge, Button, Col, Container, DropdownButton, Form, Row, Dropdown, ButtonGroup} from "react-bootstrap";

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState(null);
    const [assignmentEnums, setAssignmentEnums] = useState([])

    function updateAssignment(prop, value) {
        const newAssignment = { ...assignment };
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignment) => {
                setAssignment(assignment);
            }
        );
    }

    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", jwt)
            .then((assignmentResponse) => {
                setAssignment(assignmentResponse.assignment);
                setAssignmentEnums(assignmentResponse.assignmentEnums);

            });
    }, []);

    return (
        <Container className="mt-5">
            {assignment ? (
                <>
                    <Row className="align-items-center">
                        <Col>
                            <h1>Assignment {assignmentId}</h1>
                        </Col>
                        <Col>
                            <Badge pill bg="info" style={{ fontSize: "1em" }}>
                                {assignment.status}
                            </Badge>{' '}
                        </Col>
                    </Row>
                    <Form.Group as={Row} className="my-4" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" md="2">
                            Assignment Number:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <DropdownButton
                                as={ButtonGroup}
                                id={'assignmentName'}
                                variant={"info"}
                                title="Assignment 1"
                            >
                                {assignmentEnums.map((assignmentEnum) => (
                                    <Dropdown.Item eventKey={assignmentEnum.assignmentNum}>
                                        {assignmentEnum.assignmentName}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-4" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" md="2">
                            GitHub URL:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                type="url"
                                id="githubUrl"
                                placeholder="https://github.com/username/reponame"
                                value={
                                    assignment.githubUrl ? assignment.githubUrl : ""
                                }
                                onChange={(event) =>
                                    updateAssignment("githubUrl", event.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" md="2">
                            Branch:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                            <Form.Control
                                type="text"
                                id="branch"
                                placeholder="main"
                                value={assignment.branch ? assignment.branch : ""}
                                onChange={(event) =>
                                    updateAssignment("branch", event.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>
                    <Button size="lg" onClick={() => save(assignment)}>
                        Submit assignment
                    </Button>
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default AssignmentView;
