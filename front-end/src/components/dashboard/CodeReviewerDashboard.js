import React, {useEffect, useState} from 'react';
import {useLocalState} from "../../util/useLocalStorage";
import ajax from "../../services/fetchService";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";

function CodeReviewerDashboard(props) {
    const [jwt, seJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        ajax("api/assignments", "GET", jwt).then((assignmentsData) => {
            setAssignments(assignmentsData);
        });
    }, []);

    return (
        <div className="mt-3">
            <Container>
                <div className="h1">Code reviewer dashboard</div>
                {/*<div className="assignment-wrapper in-review"></div>*/}
                <div className="assignment-wrapper submitted">
                    <div className="h3 mb-4"
                         style={
                        {
                            marginTop: "-1.8em",
                            backgroundColor: "white",
                            width: "min-content",
                            whiteSpace: "nowrap",
                        }}
                    >Await for review
                    </div>
                    {assignments ? (
                        <Row xs={1} md={2} lg={3} xl={4} className="g-2 ">
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
                                                <Badge pill bg="info" style={{ fontSize: "1em" }}>
                                                    {assignment.status}
                                                </Badge>{' '}
                                            </Card.Subtitle>
                                            <Card.Text>
                                                <p>
                                                    <b>GitHub URL: </b>{assignment.githubUrl}
                                                </p>
                                                <p><b>Branch:</b> {assignment.branch}</p>
                                            </Card.Text>
                                            <Button
                                                variant="secondary"
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
                </div>
                {/*<div className="assignment-wrapper needs-update"></div>*/}
            </Container>
        </div>
    );
}

export default CodeReviewerDashboard;