import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Button,
    ButtonGroup,
    Col,
    Dropdown,
    DropdownButton,
    Form,
    Row,
} from "react-bootstrap";
import ajax from "../../services/fetchService";
import { UserContext } from "../provider/UserProvider";
import StatusBadge from "../statusBadge/StatusBadge";
import { useParams } from "react-router";
import CommentContainer from "../comment/CommentContainer";
import Loading from "../loading/Loading";

const StudentFormView = () => {
    const [assignment, setAssignment] = useState({
        status: null,
    });
    const { jwt, setJwt } = useContext(UserContext);
    const { assignmentId } = useParams();
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([
        { status: null },
    ]);
    const prevAssignment = useRef(assignment);

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
        /*const body = {
            "id": 2,
            "githubUrl": "https://github.com/KZMRK/assignment1",
            "codeReviewVideoUrl": null,
            "branch": "main",
            "status": "Submitted"
        };*/
        console.log(assignment)
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (response) => {
                console.log("putted")
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
        switch (status) {
            case assignmentStatuses[0].status:
                return (
                    <Button
                        size="lg"
                        onClick={() => save(assignmentStatuses[1].status)}
                    >
                        Submit Assignment
                    </Button>
                );
            case assignmentStatuses[4].status:
            case assignmentStatuses[3].status:
                return (
                    <>
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
                                <Form.Control
                                    type="url"
                                    id="codeReviewVideoUrl"
                                    value={assignment.codeReviewVideoUrl}
                                    readOnly
                                />
                            </Col>
                        </Form.Group>
                        {status === assignmentStatuses[3].status ?
                        (<Button size="lg" onClick={() => save("Resubmitted")}>
                                Re-Submit Assignment
                            </Button>)
                         : (<></>)}
                        <CommentContainer assignment={assignment} />
                    </>
                );
            default:
                return <></>;
        }
    }

    if (!assignment.status) {
        return (
            <Loading/>
        );
    }

    return assignment.status ? (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Assignment {assignment.number}</h1>
                </Col>
                <Col className="text-end">
                    <StatusBadge status={assignment.status} />
                </Col>
            </Row>
            <Form.Group as={Row} className="my-4">
                <Col>
                    <Form.Label column>Assignment Number:</Form.Label>
                </Col>
                <Col sm="8" md="8" lg="8">
                    <DropdownButton
                        as={ButtonGroup}
                        id={"assignmentName"}
                        variant={"info"}
                        title={`Assignment ${assignment.number}`}
                        onSelect={(selectedElement) => {
                            updateAssignment("number", selectedElement);
                        }}
                    >
                        {assignmentEnums.map((assignmentEnum) => (
                            <Dropdown.Item
                                key={assignmentEnum.assignmentNum}
                                eventKey={assignmentEnum.assignmentNum}
                            >
                                {assignmentEnum.assignmentNum}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="my-4 align-items-center">
                <Col>
                    <Form.Label className="mb-0">GitHub URL:</Form.Label>
                </Col>
                <Col sm="8" md="8" lg="8">
                    <Form.Control
                        type="url"
                        id="githubUrl"
                        placeholder="https://github.com/username/reponame"
                        value={assignment.githubUrl ? assignment.githubUrl : ""}
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
                        value={assignment.branch ? assignment.branch : ""}
                        onChange={(event) =>
                            updateAssignment("branch", event.target.value)
                        }
                    />
                </Col>
            </Form.Group>
            {viewDependOnStatus(assignment.status)}
        </>) : (<></>);
};

export default StudentFormView;
