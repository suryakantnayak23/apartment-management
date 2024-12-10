import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import LoginPage from './components/login.jsx';
import DashBoardView from "./edited-component/new-dashboard.jsx";
import HouseTable from "./components/house-table.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                {/*<Route path="/{this routin needs to be activated" element={<LoginPage />} />*/}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard/*" element={<DashBoardView />} />
                {/*<Route path="/house" element={<HouseTable />} />*/}
            </Routes>
        </Router>
    );
};

export default App;