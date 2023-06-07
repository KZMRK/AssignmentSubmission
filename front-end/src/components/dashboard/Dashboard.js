import React, { useEffect, useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ajax from "../../services/fetchService";
import {Card, Button, Row, Col, Container, Badge} from "react-bootstrap";
import StatusBadge from "../statusBadge/StatusBadge";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [jwt, seJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ajax("api/assignments", "GET", jwt).then((assignmentsData) => {
            setAssignments(assignmentsData);
        });
    }, []);

    function createAssignment() {
        ajax("api/assignments", "POST", jwt).then((assignment) => {
            navigate(`assignments/${assignment.id}`);
        });
    }

    return (
        <div className="mt-3">
            <Container>
                <Button
                    className="mb-4"
                    size="lg"
                    onClick={() => createAssignment()}
                >
                    Submit new assignment
                </Button>
                {assignments ? (
                    <Row xs={1} md={2} lg={3} xl={4} className="g-2">
                        {assignments.map((assignment) => (
                            <Col className="d-flex justify-content-center" key={assignment.id}>
                                <Card
                                    className="h-100"
                                    style={{ width: "18rem" }}
                                >
                                    <Card.Body className="d-flex flex-column justify-content-around">
                                        <Card.Title>
                                            Assignment #{assignment.number}
                                        </Card.Title>
                                        <Card.Subtitle className="my-2 text-muted">
                                            <StatusBadge text={assignment.status} />
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <p>
                                                <b>GitHub URL: </b>{assignment.githubUrl}
                                            </p>
                                            <p><b>Branch:</b> {assignment.branch}</p>
                                        </Card.Text>
                                        <Button
                                            variant="secondary"
                                            onClick={() => navigate(`/assignments/${assignment.id}`)}
                                        >
                                            Edit
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <></>
                )}
            </Container>
        </div>
    );
};

export default Dashboard;
