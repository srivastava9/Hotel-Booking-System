import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import "react-datepicker/dist/react-datepicker.css";
import Notifications, { notify } from "react-notify-toast";
export default class CreateBooking extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      userId: "",
      rooms: [],
      checkoutDate: new Date(),
      checkinDate: new Date(),
      users: [],
      roomId: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data,
            userId: response.data[0]._id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get("http://localhost:5000/rooms/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          rooms: response.data,
          //roomId: response.data[0]._id,
        });
      }
    });
    setTimeout(
      function () {
        if (this.props.location.state) {
          this.setState({
            roomId: this.props.location.state.roomId,
          });
        } else {
          this.setState({
            roomId: this.state.rooms[0]._id,
          });
        }
      }.bind(this),
      500
    );
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChangeinDate = (date) => {
    this.setState({
      checkinDate: date,
    });
  };
  onChangeoutDate = (date) => {
    this.setState({
      checkoutDate: date,
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const booking = {
      roomId: this.state.roomId,
      bookedBy: this.state.userId,
      checkinDate: this.state.checkinDate,
      checkoutDate: this.state.checkoutDate,
    };

    console.log(booking);

    axios
      .post("http://localhost:5000/bookings/add", booking)
      .then((res) => {
        console.log(res.data);
        notify.show("Booking Done", "success", 4000, {
          background: "#90ee90",
          text: "#FFFFFF",
        });
      })
      .catch((err) => {
        console.log(err);
        notify.show("There was some error.Try Again!", "error", 4000, {
          background: "#c70039",
          text: "#FFFFFF",
        });
      });
  }

  render() {
    return (
      <div>
        <Notifications />
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              name="userId"
              className="form-control"
              value={this.state.userId}
              onChange={this.onChange}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Rooms Available: </label>
            <select
              ref="userInput"
              required
              name="roomId"
              className="form-control"
              value={this.state.roomId}
              onChange={this.onChange}
            >
              {this.state.rooms.map((room) => {
                return (
                  <option key={room._id} value={room._id}>
                    Room Number : {room.number} | {room.type} | ${room.rent}
                    /month
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Check In Date: </label>
            <div>
              <DatePicker
                selected={this.state.checkinDate}
                onChange={this.onChangeinDate}
                minDate={new Date()}
                maxDate={addDays(new Date(), 20)}
                placeholderText="Select Check In Date"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              {" "}
              Check Out Date: (*Checkout Atleast 5 Days After of Check In Date){" "}
            </label>
            <div>
              <DatePicker
                selected={this.state.checkoutDate}
                onChange={this.onChangeoutDate}
                minDate={addDays(this.state.checkinDate, 5)}
                placeholderText="Checkout Atleast 5 Days After"
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
