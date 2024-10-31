import React, { Component } from "react";
import PropTypes from "prop-types";
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
        <ul style={{marginTop:"-55px"}}>
          <li>
            <a href="#" className="icon">🏠 News Feed</a>
          </li>
          <li>
            <a href="#">💬 Messages</a>
          </li>
          <li>
            <a
              href="#"
              className={`${isUploadActive ? "active" : ""}`}
            >
              📄 Uploads
            </a>
          </li>
          <li>
            <a href="#">👥 Friends</a>
          </li>
          <li>
            <a href="#">📷 Media</a>
          </li>
          <li>
            <a href="#">⚙️ Settings</a>
          </li>
        </ul>
        <div className="dp" >
         <img src={dp} className="dp" alt="dp" style={{height:"15vh",position:"relative",top:"40px",right:"30px"}} />
        </div>

      </div>
    );
  }
}

export default Sidebar;
