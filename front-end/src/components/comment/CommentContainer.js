import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Button, Col, Container,
    FloatingLabel,
    Form, Row
} from "react-bootstrap";
import Comment from "./Comment";
import ajax from "../../services/fetchService";
import { UserContext } from "../provider/UserProvider";
import jwt_decode from "jwt-decode";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {useInterval} from "../../util/useInterval";
import dayjs from "dayjs";
import Loading from "../loading/Loading";
import {ChatContext} from "../provider/ChatProvider";

const CommentContainer = (props) => {
    const { jwt, setJwt } = useContext(UserContext);
    const assignment = props.assignment;
    const userEmail = jwt_decode(jwt).sub;

    const emptyComment = {
        assignment: assignment,
        text: "",
        createdBy: {
            email: userEmail
        }
    }

    const [comment, setComment] = useState(emptyComment);
    const [comments, setComments] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const {stompClient, setStompClient} = useContext(ChatContext);

    useEffect(() => {
        ajax(`/api/comments?assignmentId=${assignment.id}`, "GET", jwt).then(
            (commentsData) => {
                setComments(commentsData);
            }
        );
        if (!isConnected) {
            connect();
        }
    }, []);

    const handleMessageSend = () => {
        if (stompClient) {
            stompClient.send("/app/private-message", {}, JSON.stringify(comment));
        }
    };

    useEffect(() => {
        updateComment("assignment", assignment);
    }, [assignment]);

    function updateComment(prop, value) {
        setComment((prevComment) => ({
            ...prevComment,
            [prop]: value,
        }));
    }

    function connect() {
        const client = Stomp.over(() => new SockJS('/websocket'));
        client.connect({}, (frame) => {
            client.subscribe(`/user/${userEmail}/private`, (message) => {
                const receivedComment = JSON.parse(message.body);
                setComments((prevComments) => {
                    const updatedComments = [...prevComments];
                    const editedCommentIndex = updatedComments.findIndex(
                        el => el.id === receivedComment.id
                    );
                    if (editedCommentIndex !== -1) {
                        console.log(editedCommentIndex)
                        updatedComments[editedCommentIndex] = receivedComment
                    } else {
                        updatedComments.unshift(receivedComment)
                    }
                    return updatedComments;
                })
            });
            setIsConnected(true);
        });
        setStompClient(client);
    }

    function handleEditComment(commentId) {
        const commentToEdit = comments.find((el) => el.id === commentId);
        setComment(commentToEdit);
    }

    /*useInterval(() => {
        updateCommentTimeDisplay();
    }, 1000 * 61);

    function updateCommentTimeDisplay() {
        const commentsCopy = [...comments];
        commentsCopy.forEach(
            (comment) => (comment.createdAt = dayjs(comment.createdAt))
        );
        setComments(commentsCopy);
    }*/

    function clearTextArea() {
        setComment(emptyComment);
    }

    return (
        !isConnected ? (<Loading/>) : (
        <>
            <div className="position-static bottom-0">
                <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "100px", resize: "none" }}
                        onChange={(e) => updateComment("text", e.target.value)}
                        value={comment.text}
                    />
                </FloatingLabel>
                <div  className="mt-2">
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button className="w-100" onClick={() => {
                                handleMessageSend();
                                clearTextArea();
                            }}>
                                Post Comment
                            </Button>
                        </Col>
                        <Col  className="d-flex justify-content-center">
                            <Button
                                variant="secondary"
                                className="w-100"
                                onClick={() => {
                                    clearTextArea();
                                }}
                            >
                                Clear
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <div>
                {comments ? (
                    comments
                    .sort((comment1, comment2) => {
                        if (comment1.createdAt > comment2.createdAt)
                            return -1;
                        else
                            return 1;
                    })
                    .map((comment, index) => (
                        <Comment
                            key={index}
                            comment={comment}
                            emitEditComment={handleEditComment}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        </>
        )
    );
};

export default CommentContainer;
