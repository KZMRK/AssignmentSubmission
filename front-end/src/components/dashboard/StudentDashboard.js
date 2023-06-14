import React, { useContext, useEffect, useState } from "react";
import ajax from "../../services/fetchService";
import { Button, Container } from "react-bootstrap";
import { UserContext } from "../provider/UserProvider";
import CardCollection from "./CardCollection";
import Loading from "../loading/Loading";

const StudentDashboard = () => {
    const { jwt, seJwt } = useContext(UserContext);
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        console.log("GET");
        console.log(jwt);
        ajax("/api/assignments", "GET", jwt).then((assignmentsData) => {
            setAssignments(assignmentsData);
        });
    }, []);

    function createAssignment() {
        ajax("/api/assignments", "POST", jwt).then((assignment) => {
            window.location.href = `/assignments/${assignment.id}`;
        });
    }

    return (
        <div className="mt-3">
            <Container>
                <Container className="my-4 d-flex justify-content-center justify-content-md-start">
                    <Button
                        size="lg"
                        onClick={() => createAssignment()}
                    >
                        Submit new assignment
                    </Button>
                </Container>

                {assignments ? (
                    <CardCollection assignments={assignments} />
                ) : (
                    <Loading />
                )}
            </Container>
        </div>
    );
};

export default StudentDashboard;
