import './App.css';
import {useEffect} from "react";
import {useLocalState} from "./util/useLocalStorage";
import {Route, Routes} from "react-router";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";

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
