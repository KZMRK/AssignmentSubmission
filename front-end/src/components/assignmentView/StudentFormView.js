import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ajax from "../../services/fetchService";
import { UserContext } from "../provider/UserProvider";
import StatusBadge from "../statusBadge/StatusBadge";
import { useParams } from "react-router";
import Loading from "../loading/Loading";
import { ChatContext, ChatProvider } from "../provider/ChatProvider";
import Chat from "../comment/Chat";

const StudentFormView = () => {
    const [assignment, setAssignment] = useState({
        status: null,
    });
    const { jwt, setJwt } = useContext(UserContext);
    const { assignmentId } = useParams();
    const [assignmentStatuses, setAssignmentStatuses] = useState([
        { status: null },
    ]);
    const prevAssignment = useRef(assignment);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", jwt)
            .then((assignmentResponse) => {
                setAssignment(assignmentResponse.assignment);
                setAssignmentStatuses(assignmentResponse.assignmentStatusEnums);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.message === "Forbidden") {
                    alert("У вас немає доступу до цього ресурсу.");
                } else {
                    console.log(error.message);
                }
            });
    }, []);

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
        window.location.href = "/dashboard";
    }

    function persist() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (response) => {
                setAssignment(response);
            }
        );
    }

    useEffect(() => {
        if (
            prevAssignment.current.status &&
            prevAssignment.current.status !== assignment.status
        ) {
            persist();
        }
        prevAssignment.current = assignment;
    }, [assignment]);

    function viewDependOnStatus(status) {
        if (status === assignmentStatuses[0].status) {
            return (
                <Button
                    size="lg"
                    onClick={() => save(assignmentStatuses[1].status)}
                >
                    Submit Assignment
                </Button>
            );
        } else if (status !== assignmentStatuses[1].status) {
            return (
                <>
                    {status !== assignmentStatuses[2].status ?  (
                        <Form.Group
                            as={Row}
                            className="mb-3 align-items-center"
                        >
                            <Col>
                                <Form.Label className="mb-0">
                                    Code Review Video URL:
                                </Form.Label>
                            </Col>
                            <Col sm="8" md="8" lg="8">
                                <a target="_blank" href={assignment.codeReviewVideoUrl}>{assignment.codeReviewVideoUrl}</a>
                                {/*<Form.Control
                                    type="url"
                                    id="codeReviewVideoUrl"
                                    value={assignment.codeReviewVideoUrl || ""}
                                    readOnly
                                />*/}
                            </Col>
                        </Form.Group>
                    ) : <></>}
                    <>
                        <Row className="gap-3">
                            {status === assignmentStatuses[3].status && (
                                <Col>
                                    <Button
                                        size="lg"
                                        className="w-100"
                                        onClick={() => save("Resubmitted")}
                                    >
                                        Re-Submit Assignment
                                    </Button>
                                </Col>
                            )}
                            <Col>
                                <ChatProvider>
                                    <Chat assignment={assignment} />
                                </ChatProvider>
                            </Col>
                        </Row>
                    </>
                </>
            );
        }
    }

    return isLoading ? (
        <Loading></Loading>
    ) : (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Assignment {assignment.number}</h1>
                </Col>
                <Col className="text-end">
                    <StatusBadge status={assignment.status} />
                </Col>
            </Row>
            <Form.Group as={Row} className="my-4 align-items-center">
                <Col>
                    <Form.Label className="mb-0">GitHub URL:</Form.Label>
                </Col>
                <Col sm="8" md="8" lg="8">
                    <Form.Control
                        readOnly={
                            assignment.status !== assignmentStatuses[0].status
                        }
                        type="url"
                        id="githubUrl"
                        placeholder="https://github.com/username/reponame"
                        value={assignment.githubUrl || ""}
                        onChange={(event) =>
                            updateAssignment("githubUrl", event.target.value)
                        }
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
                        value={assignment.branch || ""}
                        onChange={(event) =>
                            updateAssignment("branch", event.target.value)
                        }
                    />
                </Col>
            </Form.Group>
            {viewDependOnStatus(assignment.status)}
        </>
    );
};

export default StudentFormView;
