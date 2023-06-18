import "./App.css";
import { Route, Routes } from "react-router";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AssignmentView from "./components/assignmentView/AssignmentView";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import CodeReviewerDashboard from "./components/dashboard/CodeReviewerDashboard";
import CodeReviewerAssignmentView from "./components/assignmentView/CodeReviewerAssignmentView";
import AdminDashboard from "./components/dashboard/adminDashboard/AdminDashboard";
import { UserContext } from "./components/provider/UserProvider";
import UserView from "./components/assignmentView/UserView";

function App() {
    const { jwt, setJwt } = useContext(UserContext);
    const [role, setRole] = useState(getRoleFromJWT());

    function getRoleFromJWT() {
        if (jwt) {
            const decodedJwt = jwt_decode(jwt);
            return decodedJwt.role;
        }
        return "";
    }

    return (
    <Routes>
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        {(role === "ROLE_CODE_REVIEWER") ? (
                            <CodeReviewerDashboard />
                        ) : (role === "ROLE_STUDENT") ? (
                            <StudentDashboard />
                        ) : (
                            <AdminDashboard />
                        )}
                    </PrivateRoute>
                }
            />
            <Route
                path="/assignments/:assignmentId"
                element={
                    <PrivateRoute>
                        {(role === "ROLE_CODE_REVIEWER") ? (
                            <CodeReviewerAssignmentView />
                        ) : (
                            <AssignmentView />
                        )}
                    </PrivateRoute>
                }
            />
            <Route
                path="/users/:userId"
                element={
                    <PrivateRoute>
                        <UserView/>
                    </PrivateRoute>
                }
            >

            </Route>
            <Route path="login" element={<Login />} />
        </Routes>
    );
}

export default App;
