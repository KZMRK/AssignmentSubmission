import React, { useEffect, useState, useRef  } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ajax from "../../services/fetchService";
import {Badge, Button, Col, Container, DropdownButton, Form, Row, Dropdown, ButtonGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Navigate} from "react-router";

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        status: null
        }
    );
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);
    const prevAssignment = useRef(assignment);

    function updateAssignment(prop, value) {
        const newAssignment = { ...assignment };
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save() {
        if (assignment.status === assignmentStatuses[0].status) {
            updateAssignment("status", assignmentStatuses[1].status);
        } else {
            persist();
        }
        window.location.href="/dashboard"
    }

    function persist() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignment) => {
                setAssignment(assignment);
            }
        );
    }

    useEffect(() => {
        if (prevAssignment.current.status !== assignment.status) {
            persist()
        }
        prevAssignment.current = assignment;
    }, [assignment])

    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", jwt)
            .then((assignmentResponse) => {
                setAssignment(assignmentResponse.assignment);
                setAssignmentEnums(assignmentResponse.assignmentEnums);
                setAssignmentStatuses(assignmentResponse.assignmentStatusEnums)
            });
    }, []);

    return (
        <Container className="mt-5 justify-content-center" style={{width: "40rem"}}>
            {assignment ? (
                <>
                    <Row className="align-items-center">
                        <Col>
                            <h1>
                                Assignment {assignment.number ? assignment.number : ""}
                            </h1>
                        </Col>
                        <Col className="text-end">
                            <Badge pill bg="info" style={{ fontSize: "1em" }}>
                                {assignment.status}
                            </Badge>{' '}
                        </Col>
                    </Row>
                    <Form.Group as={Row} className="my-4">
                        <Col>
                            <Form.Label column>
                                Assignment Number:
                            </Form.Label>
                        </Col>
                        <Col sm="8" md="8" lg="8">
                            <DropdownButton
                                as={ButtonGroup}
                                id={'assignmentName'}
                                variant={"info"}
                                title={assignment.number ? `Assignment ${assignment.number}` : "Select an Assignment"}
                                onSelect={(selectedElement) => {
                                    updateAssignment("number", selectedElement);
                                }}
                            >
                                {assignmentEnums.map((assignmentEnum) => (
                                    <Dropdown.Item key={assignmentEnum.assignmentNum} eventKey={assignmentEnum.assignmentNum}>
                                        {assignmentEnum.assignmentNum}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-4 align-items-center">
                        <Col>
                            <Form.Label className="mb-0">
                                GitHub URL:
                            </Form.Label>
                        </Col>
                        <Col sm="8" md="8" lg="8">
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
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Col>
                            <Form.Label className="mb-0">
                                Branch:
                            </Form.Label>
                        </Col>
                        <Col sm="8" md="8" lg="8">
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
