import React, {useEffect, useState, useRef, useContext} from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ajax from "../../services/fetchService";
import {
    Badge,
    Button,
    Col,
    Container,
    DropdownButton,
    Form,
    Row,
    Dropdown,
    ButtonGroup,
} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { Navigate } from "react-router";
import {UserContext} from "../provider/UserProvider";

const CodeReviewerAssignmentView = () => {
    const {jwt, setJwt} = useContext(UserContext);
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        status: null,
    });
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);
    const prevAssignment = useRef(assignment);


    function updateAssignment(prop, value) {
        const newAssignment = { ...assignment };
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save(status) {
        if (status && assignment.status !== status) {
            updateAssignment("status", status);
        } else {
            persist();
        }
        window.location.href="/dashboard";
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
            persist();
        }
        prevAssignment.current = assignment;
    }, [assignment]);

    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
            (assignmentResponse) => {
                setAssignment(assignmentResponse.assignment);
                setAssignmentEnums(assignmentResponse.assignmentEnums);
                setAssignmentStatuses(assignmentResponse.assignmentStatusEnums);
            }
        );
    }, []);

    return (
        <Container
            className="mt-5 justify-content-center"
            style={{ width: "40rem" }}
        >
            {assignment ? (
                <>
                    <Row className="align-items-center">
                        <Col>
                            <h1>
                                Assignment{" "}
                                {assignment.number ? assignment.number : ""}
                            </h1>
                        </Col>
                        <Col className="text-end">
                            <Badge pill bg="info" style={{ fontSize: "1em" }}>
                                {assignment.status}
                            </Badge>{" "}
                        </Col>
                    </Row>
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
                                    assignment.githubUrl
                                        ? assignment.githubUrl
                                        : ""
                                }
                                readOnly
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Col>
                            <Form.Label className="mb-0">Branch:</Form.Label>
                        </Col>
                        <Col sm="8" md="8" lg="8">
                            <Form.Control
                                type="text"
                                id="branch"
                                placeholder="main"
                                value={
                                    assignment.branch ? assignment.branch : ""
                                }
                                readOnly
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Col>
                            <Form.Label className="mb-0">
                                Video Review URL:
                            </Form.Label>
                        </Col>
                        <Col sm="8" md="8" lg="8">
                            <Form.Control
                                type="url"
                                id="videoReviewURL"
                                placeholder="https://screencast-o-matic.com/smth"
                                value={
                                    assignment.codeReviewVideoUrl
                                        ? assignment.codeReviewVideoUrl
                                        : ""
                                }
                                onChange={(e) =>
                                    updateAssignment(
                                        "codeReviewVideoUrl",
                                        e.target.value
                                    )
                                }
                            />
                        </Col>
                    </Form.Group>
                    <Button
                        size="lg"
                        onClick={() => save(assignmentStatuses[4].status)}
                    >
                        Complete Review
                    </Button>
                    {assignment.status === "Needs Update" ? (
                        <Button
                            className="mx-2"
                            variant="secondary"
                            size="lg"
                            onClick={() => save(assignmentStatuses[2].status)}
                        >
                            Re-Claim
                        </Button>
                    ) : (
                        <Button
                            className="mx-2"
                            variant="danger"
                            size="lg"
                            onClick={() => save(assignmentStatuses[3].status)}
                        >
                            Reject Assignment
                        </Button>
                    )}
                </>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default CodeReviewerAssignmentView;
