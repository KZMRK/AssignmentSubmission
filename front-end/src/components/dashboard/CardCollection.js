import React, {useEffect, useState} from "react";
import {Button, Card, Col, Pagination, Row} from "react-bootstrap";
import StatusBadge from "../statusBadge/StatusBadge";

const CardCollection = (props) => {
    const assignments = props.assignments;
    const buttonText = props.buttonText;
    const buttonClickedAction = props.buttonClickedAction;

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 8;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex=  lastIndex - recordsPerPage;
    const records = assignments.slice(firstIndex, lastIndex);
    const npage = Math.ceil(assignments.length / recordsPerPage);
    const [pagItems, setPagItems] = useState([]);

    useEffect(() => {
        const newPagItems = [];
        newPagItems.push(<Pagination.Prev
            onClick={() => {
                if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            }}
        />);
        for (let number = 1; number <= npage; number++) {
            newPagItems.push(
                <Pagination.Item key={number}
                                 active={number === currentPage}
                                 onClick={() => {
                                     setCurrentPage(number)
                                 }}
                >
                    {number}
                </Pagination.Item>,
            )
        }
        newPagItems.push(<Pagination.Next onClick={() => {
            if (currentPage < npage) {
                setCurrentPage(currentPage + 1);
            }
        }} />);
        setPagItems(newPagItems);
    }, [currentPage]);

    return (
        <div>
            <Row xs={1} md={2} lg={3} xl={4} className="g-2">
                {records.map((assignment) => (
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
            <Pagination className="mt-4 justify-content-center">
                {pagItems}
            </Pagination>
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
