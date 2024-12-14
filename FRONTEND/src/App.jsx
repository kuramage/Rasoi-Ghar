import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { SignIn } from "./components/signin";
import Home from "./components/home.jsx";
import Sidebar from "./components/sidebar";
import Upload from "./components/upload";
import Profile from "./components/profile";

// Replace useUser with your own authentication logic
const useAuth = () => {
    // Placeholder authentication logic
    const user = JSON.parse(localStorage.getItem("user")); // Example: Fetch user from local storage
    return user;
};

function App() {
    const user = useAuth(); // Get the current user

    console.log(user);

    return (
        <Router>
            <div className="app">
                {/* Show Sidebar only if user is logged in */}
                {user && <Sidebar />}

                <Routes>
                    {/* Root route redirects to /home if user is logged in, otherwise to /signin */}
                    <Route path="/" element={<Navigate to={user ? "/home" : "/signin"} />} />

                    {/* SignIn route */}
                    <Route path="/signin" element={user ? <Navigate to="/home" /> : <SignIn />} />

                    {/* Home route */}
                    <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />

                    {/* Upload route */}
                    <Route path="/upload" element={user ? <Upload /> : <Navigate to="/signin" />} />

                    {/* Profile route */}
                    <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
