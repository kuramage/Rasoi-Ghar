import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "./logo2.png"; // Adjust the path as needed
import dp from './dp.png';

export class Sidebar extends Component {
  static propTypes = {
    isUploadActive: PropTypes.bool, // Prop to determine if "Uploads" is active
  };

  static defaultProps = {
    isUploadActive: false, // Default to false if not provided
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
                  className={`${isUploadActive ? "active" : ""}`}
              >
                📄 Upload
              </Link>
            </li>
            <li>
              <Link to="/profile">👤 Profile</Link>
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

export default Sidebar;
