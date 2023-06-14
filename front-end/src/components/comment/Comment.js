import React, { useContext, useEffect, useState } from "react";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { UserContext } from "../provider/UserProvider";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Comment = (props) => {
    const { jwt, setJwt } = useContext(UserContext);
    const decodedJwt = jwt_decode(jwt);
    const { id, createdAt, createdBy, text } = props.comment;
    const { emitDeleteComment, emitEditComment } = props;
    const [commentRelativeTime, setCommentRelativeTime] = useState("");

    useEffect(() => {
        updateCommentRelativeTime();
    }, [createdAt]);

    function updateCommentRelativeTime() {
        if (createdAt) {
            dayjs.extend(relativeTime);
            setCommentRelativeTime(dayjs(createdAt).fromNow());
        }
    }

    return (
        <>
            <div className="comment-bubble">
                <div className="d-flex justify-content-between">
                    <div style={{ fontWeight: "bold" }}>
                        {`${createdBy.firstName} ${createdBy.lastName}`}
                    </div>
                    {decodedJwt.sub === createdBy.username ? (
                        <div>
                            <AiFillEdit
                                role="button"
                                onClick={() => emitEditComment(id)}
                                style={{ marginRight: "0.6em" }}
                            />
                            <AiTwotoneDelete
                                role="button"
                                onClick={() => emitDeleteComment(id)}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div>{text}</div>
            </div>
            {commentRelativeTime ? (
                <div className="comment-relative-time">Sent {commentRelativeTime}</div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Comment;
