import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Notifications, { notify } from "react-notify-toast";
const Exercise = (props) => (
  <tr>
    <td>{props.room.number}</td>
    <td>{props.room.type}</td>
    <td>{props.room.description}</td>
    <td>${props.room.rent}/month</td>
    <td>{props.room.bedCapacity} beds</td>
    <td>{props.room.address}</td>
    {/* <td>{props.room.date.substring(0, 10)}</td> */}
    <td>
      <Link
        to={{
          pathname: "/create/" + props.room.number,
          state: { roomId: props.room._id },
        }}
      >
        Book
      </Link>{" "}
      |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.room._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class RoomsList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { rooms: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/rooms/")
      .then((response) => {
        this.setState({ rooms: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/rooms/" + id).then((response) => {
      notify.show("Room Deleted !", "success", 4000, {
        background: "#90ee90",
        text: "#FFFFFF",
      });
    });

    this.setState({
      rooms: this.state.rooms.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.rooms.map((currentroom) => {
      return (
        console.log(currentroom),
        (
          <Exercise
            room={currentroom}
            deleteExercise={this.deleteExercise}
            key={currentroom._id}
          />
        )
      );
    });
  }

  render() {
    return (
      <div>
        <Notifications />
        <h3>Available Rooms</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Description</th>
              <th>Rent</th>
              <th>Bed Capacity</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
