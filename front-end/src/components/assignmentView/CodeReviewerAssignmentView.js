import React, { useEffect, useState, useRef, useContext } from "react";
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
    ButtonGroup, Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
import { UserContext } from "../provider/UserProvider";
import CommentContainer from "../comment/CommentContainer";
import StatusBadge from "../statusBadge/StatusBadge";
import Loading from "../loading/Loading";

const CodeReviewerAssignmentView = () => {
    const { jwt, setJwt } = useContext(UserContext);
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
            window.location.href = "/dashboard";
        }
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
        ).catch(error => {
            if (error.message === "Forbidden") {
                alert("У вас немає доступу до цього ресурсу.");
            } else {
                console.log(error.message);
            }
        });
    }, []);

    if (!assignment.status) {
        return (
            <Loading/>
        );
    }

    function showButtonDependsOnStatus(status) {
        switch (status) {
            case assignmentStatuses[3].status:
                return (
                    <Button
                        className="mx-2"
                        variant="secondary"
                        size="lg"
                        onClick={() => save(assignmentStatuses[2].status)}
                    >
                        Re-Claim
                    </Button>
                );
            case assignmentStatuses[2].status:
            case assignmentStatuses[5].status:
                return (
                    <>
                        <Button
                            size="lg"
                            onClick={() => save(assignmentStatuses[4].status)}
                        >
                            Complete Review
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            size="lg"
                            onClick={() => save(assignmentStatuses[3].status)}
                        >
                            Reject Assignment
                        </Button>
                    </>
                );
            default:
                return <></>;
        }
    }

    return (
        <Container
            className="mt-5 justify-content-center"
            style={{ maxWidth: "40rem" }}
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
                            <StatusBadge status={assignment.status} />
                        </Col>
                    </Row>
                    <Form.Group as={Row} className="my-4 align-items-center">
                        <Col>
                            <Form.Label className="mb-0">
                                GitHub URL:
                            </Form.Label>
                        </Col>
                        <Col sm="6" md="8" lg="8">
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
                    {showButtonDependsOnStatus(assignment.status)}
                </>
            ) : (
                <></>
            )}
            <CommentContainer assignment={assignment} />
        </Container>
    );
};

export default CodeReviewerAssignmentView;
