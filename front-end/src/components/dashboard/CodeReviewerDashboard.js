import React, {useContext, useEffect, useState} from 'react';
import {useLocalState} from "../../util/useLocalStorage";
import ajax from "../../services/fetchService";
import {Badge, Button, Card, Col, Container, Row} from "react-bootstrap";
import StatusBadge from "../statusBadge/StatusBadge";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../provider/UserProvider";
import CardCollection from "./CardCollection";

function CodeReviewerDashboard() {
    const {jwt, seJwt} = useContext(UserContext);
    const [assignments, setAssignments] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ajax("/api/assignments", "GET", jwt).then((assignmentsData) => {
            setAssignments(assignmentsData);
        });
    }, []);

    function claimAssignment(assignment) {
        ajax(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment)
        .then((assignment) => {
            const newAssignments = [ ...assignments ];
            const assignmentIndex = newAssignments.findIndex(element => element.id === assignment.id);
            newAssignments[assignmentIndex] = assignment;
            setAssignments(newAssignments);
        });
    }

    return (
        <div className="mt-3">
            <Container>
                <div className="h1">Code reviewer dashboard</div>
                <div className="assignment-wrapper submitted">
                    <div className="h3 mb-4 assignment-wrapper-title">Await for review</div>
                    {assignments && assignments.some((assignment) => assignment.status === "Submitted") ? (
                        <CardCollection buttonClickedAction={claimAssignment} buttonText="Claim" assignments={assignments.filter((assignment) => assignment.status === "Submitted")}/>
                    ) : (
                        <div>No assignments found</div>
                    )}
                </div>
                <div className="assignment-wrapper in-review">
                    <div className="h3 mb-4 assignment-wrapper-title">In Review</div>
                    {assignments && assignments.some((assignment) => assignment.status === "In Review" || assignment.status === "Resubmitted")  ? (
                        <CardCollection buttonText="Edit" assignments={assignments
                        .filter((assignment) => assignment.status === "In Review" || assignment.status === "Resubmitted")
                        .sort((assignment1, assignment2) => {
                            if (assignment1.status === "Resubmitted")
                                return -1;
                            else
                                return 1;
                        })}/>
                    ) : (
                        <div>No assignments found</div>
                    )}
                </div>
                <div className="assignment-wrapper needs-update">
                    <div className="h3 mb-4 assignment-wrapper-title">Needs Update</div>
                    {assignments && assignments.some(assignment => assignment.status === "Needs Update") ? (
                        <CardCollection buttonText="View" assignments={assignments.filter((assignment) => assignment.status === "Needs Update")}/>
                    ) : (
                        <div>No assignments found</div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default CodeReviewerDashboard;