import Offcanvas from 'react-bootstrap/Offcanvas';
import {Button} from "react-bootstrap";
import CommentContainer from "./CommentContainer";
import {useState} from "react";

const Chat = (props) => {
    const assignment = props.assignment;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button size="lg" variant="primary" onClick={handleShow} className="me-2">
                Go to comments
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Comments</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CommentContainer assignment={assignment} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Chat;