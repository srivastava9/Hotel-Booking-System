import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          RoomTracker
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/booking" className="nav-link">
                Bookings List
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Book Room
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/add-room" className="nav-link">
                Create Room
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
