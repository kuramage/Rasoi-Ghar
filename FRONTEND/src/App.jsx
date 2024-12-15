import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./components/signin";
import Home from "./components/home";
import Sidebar from "./components/sidebar";
import Upload from "./components/upload";
import Profile from "./components/profile";
import Showpost from "./components/showpost";
import UploadPost from "./components/upload_post";

const useAuth = () => {
    const user = localStorage.getItem("user");
    try {
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error("Error parsing user data:", e);
        return null;
    }
};

function App() {
    const user = useAuth();
    console.log(user);

    return (
        <Router>
            <div className="app">
                {/* Conditionally render Sidebar if user is authenticated */}
                {user && <Sidebar />}

                <Routes>
                    {/* Redirect root to appropriate page */}
                    <Route path="/" element={<Navigate to={user ? "/home" : "/signin"} replace />} />

                    {/* Routes with conditional navigation based on user authentication */}
                    <Route path="/signin" element={user ? <Navigate to="/home" /> : <SignIn />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/upload" element={ <UploadPost /> } />
                    <Route path="/showpost" element={ <Showpost /> } />
                    <Route path="/profile" element={ <Profile /> }/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
