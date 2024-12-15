import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import logo from "./logo2.png"; // Adjust the path as needed
import dp from './dp.png';

class Sidebar extends Component {
  static propTypes = {
    isUploadActive: PropTypes.bool, // Prop to determine if "Uploads" is active
    navigate: PropTypes.func, // Explicitly declare navigate prop here
  };

  static defaultProps = {
    isUploadActive: false, // Default to false if not provided
  };

  // Function to handle log out
  handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    console.log(localStorage.getItem("user"));
    // Redirect to the login page
    this.props.navigate("/signin");
  };

  render() {
    const { isUploadActive } = this.props;

    return (
      <div className="fixed-top font-sans sidebar">
        <img src={logo} className="logo" alt="logo" height="10px" />
        <ul style={{ marginTop: "-55px" }}>
          <li>
            <Link to="/" className="icon">🏠 Home</Link>
          </li>
          <li>
            <Link
              to="/upload"
              className={isUploadActive ? "active" : ""} 
            >
              📄 Upload
            </Link>
          </li>
          <li>
            <Link
              to="/showpost"
              className={isUploadActive ? "active" : ""} 
            >
              📄 post
            </Link>
          </li>
          <li>
            <Link to="/profile">👤 Profile</Link>
          </li>
          <li>
            {/* Log out button */}
            <button onClick={this.handleLogout} className="logout-button">
              👤 LogOut
            </button>
          </li>
        </ul>
        <div className="dp">
          <img
            src={dp}
            className="dp"
            alt="dp"
            style={{ height: "15vh", position: "relative", top: "40px", right: "30px" }}
          />
        </div>
      </div>
    );
  }
}

// Higher-order component to provide navigate function as prop
const SidebarWithNavigate = (props) => {
  const navigate = useNavigate(); // Capture navigate hook here
  return <Sidebar {...props} navigate={navigate} />;  // Pass navigate to Sidebar
};

export default SidebarWithNavigate;
