import "./App.css";
import { Route, Routes } from "react-router";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AssignmentView from "./components/assignmentView/AssignmentView";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import CodeReviewerDashboard from "./components/dashboard/CodeReviewerDashboard";
import CodeReviewerAssignmentView from "./components/assignmentView/CodeReviewerAssignmentView";
import { UserContext } from "./components/provider/UserProvider";

function App() {
    const { jwt, setJwt } = useContext(UserContext);
    const [roles, setRoles] = useState(getRoleFromJWT());

    function getRoleFromJWT() {
        if (jwt) {
            const decodedJwt = jwt_decode(jwt);
            return decodedJwt.authorities;
        }
        return [];
    }

    return (
    <Routes>
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        {roles.some((role) => role === "ROLE_CODE_REVIEWER") ? (
                            <CodeReviewerDashboard />
                        ) : (
                            <Dashboard />
                        )}
                    </PrivateRoute>
                }
            />
            <Route
                path="/assignments/:id"
                element={
                    <PrivateRoute>
                        {roles.some((role) => role === "ROLE_CODE_REVIEWER") ? (
                            <CodeReviewerAssignmentView />
                        ) : (
                            <AssignmentView />
                        )}
                    </PrivateRoute>
                }
            />
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
        </Routes>
    );
}

export default App;
