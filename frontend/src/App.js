import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar.component";
import RoomsList from "./components/rooms-list.component";
//import EditExercise from "./components/edit-exercise.component";
import CreateBooking from "./components/create-booking.component";
import CreateUser from "./components/create-user.component";
import CreateRoom from "./components/create-rooms";
import BookingList from "./components/booking-list";
import CallUser from "./components/call";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={RoomsList} />
        <Route path="/call" component={CallUser} />
        <Route path="/create" component={CreateBooking} />
        <Route path="/add-room" component={CreateRoom} />
        <Route path="/user" component={CreateUser} />
        <Route path="/booking" component={BookingList} />
      </div>
    </Router>
  );
}

export default App;
