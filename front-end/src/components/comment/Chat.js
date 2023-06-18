import Offcanvas from 'react-bootstrap/Offcanvas';
import CommentContainer from "./CommentContainer";
import React, {useContext, useState} from "react";
import {ChatContext} from "../provider/ChatProvider";
import {Button} from "react-bootstrap";

const Chat = (props) => {
    const assignment = props.assignment;
    const {stompClient} = useContext(ChatContext);
    const [show, setShow] = useState(false);


    return (
        <>
            <Button size="lg" variant="primary"
                    onClick={() =>
                setShow(true)}
                    className="me-2 w-100">
                Go to comments
            </Button>
            <Offcanvas

                show={show}
                onHide={() => setShow(false)}
                placement="end"
                onExit={ stompClient && (() => stompClient.disconnect())}
            >
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