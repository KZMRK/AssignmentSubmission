import React, { useEffect, useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import ajax from "../../services/fetchService";

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState();

    function updateAssignment(prop, value) {
        const newAssignment = { ...assignment };
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignment) => {
                setAssignment(assignment);
            }
        );
    }

    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", jwt)
            .then((assignmentData) => {
                setAssignment(assignmentData);
            });
    }, []);

    return (
        <div>
            <h1>Assignment {assignmentId}</h1>
            {assignment ? (
                <>
                    <h2>Status: {assignment.status}</h2>
                    <h3>
                        <label htmlFor="githubUrl">GitHub URL: </label>
                        <input
                            type="url"
                            id="githubUrl"
                            value={
                                assignment.githubUrl ? assignment.githubUrl : ""
                            }
                            onChange={(event) =>
                                updateAssignment(
                                    "githubUrl",
                                    event.target.value
                                )
                            }
                        />
                    </h3>
                    <h3>
                        <label htmlFor="branch">Branch: </label>
                        <input
                            type="text"
                            id="branch"
                            value={assignment.branch ? assignment.branch : ""}
                            onChange={(event) =>
                                updateAssignment("branch", event.target.value)
                            }
                        />
                    </h3>
                    <button onClick={() => save(assignment)}>
                        Submit assignment
                    </button>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default AssignmentView;
