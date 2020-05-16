import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Booking = (props) => (
  <tr>
    <td>
      {
        props.rooms.filter((room) => {
          return room._id == props.booking.roomId;
        })[0].number
      }
    </td>
    <td>
      {
        props.users.filter((user) => {
          return user._id == props.booking.bookedBy;
        })[0].username
      }
    </td>
    <td>{props.booking.checkinDate.substring(0, 10)}</td>
    <td>{props.booking.checkoutDate.substring(0, 10)}</td>
    <td>
      $
      {
        props.rooms.filter((room) => {
          return room._id == props.booking.roomId;
        })[0].rent
      }
      /month{" "}
    </td>
    <td>
      {
        props.rooms.filter((room) => {
          return room._id == props.booking.roomId;
        })[0].address
      }
    </td>
    <td>
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete Booking
      </a>
    </td>
    {/* <td>{props.room.date.substring(0, 10)}</td> */}
  </tr>
);

export default class BookingList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { bookings: [], rooms: [], users: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/bookings/")
      .then((response) => {
        this.setState({ bookings: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/rooms/")
      .then((response) => {
        this.setState({ rooms: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/rooms/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }
  bookingList = () => {
    return this.state.bookings.map((currentbooking) => {
      //       const current_room = this.state.rooms.filter((room) => {
      //         return room._id == currentbooking.roomId;
      //       });
      //       const current_user = this.state.rooms.filter((user) => {
      //         return user._id == currentbooking.bookedBy;
      //       });

      if (this.state.rooms.length > 0 && this.state.users.length > 0) {
        return (
          <Booking
            booking={currentbooking}
            rooms={this.state.rooms}
            users={this.state.users}
            deleteExercise={this.deleteExercise}
            key={currentbooking._id}
          />
        );
      } else {
        console.log("loading");
      }
    });
  };
  //   bookingList() {
  //     return this.state.bookings.map((currentbooking) => {

  //       const current_room = this.state.rooms.filter((room) => {
  //         return room._id == currentbooking.roomId;
  //       });
  //       const current_user = this.state.rooms.filter((user) => {
  //         return user._id == currentbooking.bookedBy;
  //       });

  //       return (
  //         <Booking
  //           booking={currentbooking}
  //           room={current_room}
  //           user={current_user}
  //           deleteExercise={this.deleteExercise}
  //           key={currentbooking._id}
  //         />
  //       );
  //     });
  //   }

  render() {
    return (
      <div>
        <h3>Bookings List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Booked Room Number</th>
              <th>Booked By</th>
              <th>Check In Date</th>
              <th>Check Out Date</th>
              <th>Rent</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.bookingList()}</tbody>
        </table>
      </div>
    );
  }
}
