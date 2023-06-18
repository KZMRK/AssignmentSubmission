import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import StatusBadge from "../statusBadge/StatusBadge";

const CardCollection = (props) => {
    const assignments = props.assignments;
    const buttonText = props.buttonText;
    const buttonClickedAction = props.buttonClickedAction;

    return (
        <div>
            <Row xs={1} md={2} lg={3} xl={4} className="g-2">
                {assignments.map((assignment) => (
                    <Col
                        className="d-flex justify-content-center"
                        key={assignment.id}
                    >
                        <Card className="h-100" style={{ width: "18rem" }}>
                            <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>
                                    Assignment #{assignment.number}
                                </Card.Title>
                                <Card.Subtitle className="my-2 text-muted">
                                    <StatusBadge status={assignment.status} />
                                </Card.Subtitle>
                                <Card.Text>
                                    <b>GitHub URL: </b> {assignment.githubUrl}
                                </Card.Text>
                                <Card.Text className="">
                                    <b>Branch:</b> {assignment.branch}
                                </Card.Text>
                                <Button
                                    variant="secondary"
                                    onClick={() => buttonClickedAction(assignment)}
                                >
                                    {buttonText}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

CardCollection.defaultProps = {
    buttonText: "Edit",
    buttonClickedAction: (assignment) => {
        window.location.href=`/assignments/${assignment.id}`;
    }
}

export default CardCollection;
