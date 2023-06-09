import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Badge,
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

const StudentFormView = () => {
    const [assignment, setAssignment] = useState({
        status: null
    });
    const { jwt, setJwt } = useContext(UserContext);
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([
        {status: null}
    ]);
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
        window.location.href = "/dashboard";
    }

    function persist() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignment) => {
                console.log("Make put")
                setAssignment(assignment);
            }
        );
    }

    useEffect(() => {
        if (prevAssignment.current.status && prevAssignment.current.status !== assignment.status) {
            console.log(prevAssignment.current)
            console.log(assignment);
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

    function viewDependOnStatus(status) {
        switch (status) {
            case assignmentStatuses[0].status:
                return (
                    <Button size="lg" onClick={() => save(assignmentStatuses[1].status)}>
                        Submit Assignment
                    </Button>
                );
            case assignmentStatuses[4].status:
                return (
                    <Form.Group as={Row} className="mb-3 align-items-center">
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
                );
            case assignmentStatuses[3].status:
                return (
                <Button size="lg" onClick={() => save("Resubmitted")}>
                    Re-Submit Assignment
                </Button>
            );
            default:
                return (<></>);
        }
    }

    if (!assignment) {
        return (<div style={{position: "absolute", left: "0", top: "0"}}>Loading...</div>);
    }

    return (
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
                        title={
                            `Assignment ${assignment.number}`
                        }
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
        </>
    );
};

export default StudentFormView;
