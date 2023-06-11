import { Container } from "react-bootstrap";
import StudentFormView from "./StudentFormView";

const AssignmentView = () => {
    return (
        <Container
            className="mt-5 justify-content-center"
            style={{ maxWidth: "40rem" }}
        >
            <StudentFormView />
        </Container>
    );
};

export default AssignmentView;
