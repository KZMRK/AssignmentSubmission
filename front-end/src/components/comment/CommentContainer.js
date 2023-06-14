import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Button,
    FloatingLabel,
    Form
} from "react-bootstrap";
import Comment from "./Comment";
import ajax from "../../services/fetchService";
import { UserContext } from "../provider/UserProvider";
import jwt_decode from "jwt-decode";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {useInterval} from "../../util/useInterval";
import dayjs from "dayjs";


let stompClient = null;
const CommentContainer = (props) => {
    const { jwt, setJwt } = useContext(UserContext);
    const assignment = props.assignment;
    const userEmail = jwt_decode(jwt).sub;

    const [comment, setComment] = useState({
        assignment: assignment,
        text: "",
        createdBy: {
            email: userEmail
        }
    });
    const [comments, setComments] = useState([]);

    useEffect(() => {
        ajax(`/api/comments?assignmentId=${assignment.id}`, "GET", jwt).then(
            (commentsData) => {
                setComments(commentsData);
            }
        );
            connect();
    }, []);

    const handleMessageSend = () => {
        if (stompClient) {
            stompClient.send("/app/private-message", {}, JSON.stringify(comment));
        }
    };

    /*useEffect(() => {
        if (stompClient) {

        }
    }, [stompClient]);*/

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
        const socket = new SockJS('/websocket');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.subscribe(`/user/${userEmail}/private`, (message) => {
                const receivedComment = JSON.parse(message.body);
                setComments((prevMessages) => [receivedComment, ...prevMessages]);
            });
        });
    }

    function handleDeleteComment(commentId) {
        ajax(`/api/comments/${commentId}`, "DELETE", jwt).then((deletedId) => {
            const commentsCopy = [...comments];
            const deletedCommentIndex = commentsCopy.findIndex(
                (comment) => comment.id === deletedId
            );
            commentsCopy.splice(deletedCommentIndex, 1);
            setComments(commentsCopy);
        });
    }

    function handleEditComment(commentId) {
        const commentToEdit = comments.find((el) => el.id === commentId);
        setComment(commentToEdit);
    }

    useInterval(() => {
        updateCommentTimeDisplay();
    }, 1000 * 61);

    function updateCommentTimeDisplay() {
        const commentsCopy = [...comments];
        commentsCopy.forEach(
            (comment) => (comment.createdAt = dayjs(comment.createdAt))
        );
        setComments(commentsCopy);
    }

    function submitComment() {
        const isCommentInDatabase =
            comments && comments.some((el) => el.id === comment.id);
        if (isCommentInDatabase) {
            ajax(`/api/comments/${comment.id}`, "PUT", jwt, comment).then(
                (editedComment) => {
                    const newComments = [...comments];
                    const editedCommentIndex = comments.findIndex(
                        (el) => el.id === editedComment.id
                    );
                    newComments[editedCommentIndex] = editedComment;
                    setComments(newComments);
                }
            );
        } else {
            ajax("/api/comments", "POST", jwt, comment).then((data) => {
                const newComments = [...comments];
                newComments.push(data);
                setComments(newComments);
                const newComment = { ...comment };
                newComment.text = "";
                setComment(newComment);
            });
        }
    }

    function clearTextArea() {
        const copyComment = { ...comment };
        copyComment.text = "";
        setComment(copyComment);
    }

    return (
        <>
            <div className="position-static bottom-0">
                <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "100px" }}
                        onChange={(e) => updateComment("text", e.target.value)}
                        value={comment.text}
                    />
                </FloatingLabel>
                <div>
                    <Button onClick={() => {
                        handleMessageSend();
                        clearTextArea();
                    }}>
                        Post Comment
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            clearTextArea();
                        }}
                    >
                        Clear
                    </Button>
                </div>
            </div>
            <div>
                {comments ? (
                    comments
                    .sort((comment1, comment2) => {
                        if (comment1.createdAt > comment2.createdAt)
                            return -1;
                        else return 1;
                    })
                    .map((comment, index) => (
                        <Comment
                            key={index}
                            comment={comment}
                            emitDeleteComment={handleDeleteComment}
                            emitEditComment={handleEditComment}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default CommentContainer;
