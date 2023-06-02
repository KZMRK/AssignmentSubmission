import './App.css';
import {Route, Routes} from "react-router";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AssignmentView from "./components/assignmentView/AssignmentView";

function App() {
    return (
        <Routes>
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard/>
                </PrivateRoute>
            } />
            <Route path="/assignments/:id"
                   element={
                        <PrivateRoute>
                            <AssignmentView/>
                        </PrivateRoute>
                   }
            />
            <Route path="/" element={<Home/>}/>
            <Route path="login" element={<Login/>} />
        </Routes>
    );
}

export default App;
