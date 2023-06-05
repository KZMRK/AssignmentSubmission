import React, { useEffect, useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import { Link } from "react-router-dom";
import ajax from "../../services/fetchService";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        ajax("api/assignments", "GET", jwt).then((assignmentsData) => {
            setAssignments(assignmentsData);
        });
    }, []);

    function createAssignment() {
        ajax("api/assignments", "POST", jwt).then((assignment) => {
            window.location.href = `assignments/${assignment.id}`;
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
                    <Row xs={1} md={2} lg={3} xl={4} className="g-2 ">
                        {assignments.map((assignment) => (
                            <Col key={assignment.id}>
                                <Card
                                    className="h-100"
                                    style={{ width: "18rem" }}
                                >
                                    <Card.Body className="d-flex flex-column justify-content-around">
                                        <Card.Title>
                                            Assignment {assignment.id}
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {assignment.status}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <p>
                                                GitHub URL:{" "}
                                                {assignment.githubUrl}
                                            </p>
                                            <p>Branch: {assignment.branch}</p>
                                        </Card.Text>
                                        <Button
                                            onClick={() =>
                                                (window.location.href = `/assignments/${assignment.id}`)
                                            }
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
