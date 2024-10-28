import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "./logo2.png"; // Adjust the path as needed

export class Sidebar extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="fixed-top font-sans sidebar">
        <img src={logo} className="logo" alt="logo" height="10px" />
        <ul>
          <li>
            <a href="#" className="icon">🏠 News Feed</a>
          </li>
          <li>
            <a href="#">💬 Messages</a>
          </li>
          <li>
            <a href="#">📄 Forums</a>
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
      </div>
    );
  }
}

export default Sidebar;
