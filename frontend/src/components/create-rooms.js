import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import "react-datepicker/dist/react-datepicker.css";
import Notifications, { notify } from "react-notify-toast";
export default class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      number: null,
      type: "single",
      description: "",
      bedCapacity: 0,
      rent: 1000,
      address: "",
      rooms: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/rooms/")
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data);
          this.setState({
            rooms: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  checkRoomNo = (e) => {
    setTimeout(
      function () {
        const ini_room = this.state.rooms.filter((room) => {
          return room.number == this.state.number;
        });
        if (ini_room.length > 0) {
          console.log(ini_room);
          this.setState({
            number_error: " *A room with this number,Already exists !",
            number_bool: true,
          });
        } else {
          console.log("hey ye", ini_room);
          this.setState({
            number_error: " ",
            number_bool: false,
          });
        }
      }.bind(this),
      1000
    );
  };
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const {
      number,
      type,
      rent,
      description,
      bedCapacity,
      address,
    } = this.state;
    const room = {
      number,
      type,
      rent,
      description,
      bedCapacity,
      address,
    };

    console.log(room);

    axios
      .post("http://localhost:5000/rooms/add", room)
      .then((res) => {
        console.log(res.data);
        notify.show("Room Added !", "success", 4000, {
          background: "#90ee90",
          text: "#FFFFFF",
        });
      })
      .then(() => {
        this.props.history.push("/");
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
        <h3>Add New Room </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Room Number: </label>
            <input
              required
              name="number"
              type="number"
              className="form-control"
              value={this.state.number}
              onChange={(e) => {
                this.onChange(e);
                this.checkRoomNo(e);
              }}
              placeholder="Enter Room Number"
            />
          </div>
          <p className="form-error">{this.state.number_error}</p>
          <div className="form-group">
            <label>Rooms Type: </label>
            <select
              ref="userInput"
              required
              name="type"
              className="form-control"
              value={this.state.type}
              onChange={this.onChange}
            >
              <option value="Single">Single Room</option>
              <option value="Double">Double Room</option>
              <option value="Triple">Triple Room</option>
            </select>
          </div>
          <div className="form-group">
            <label>Room Description: </label>
            <input
              required
              name="description"
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChange}
              placeholder="Describe the room briefly"
            />
          </div>
          <div className="form-group">
            <label>Bed Capacity (per Room) </label>
            <input
              required
              name="bedCapacity"
              type="number"
              className="form-control"
              value={this.state.bedCapacity}
              onChange={this.onChange}
              placeholder="Enter Number of Bed(s) per Room."
            />
          </div>
          <div className="form-group">
            <label>Rent ($/month) </label>
            <input
              required
              name="rent"
              type="number"
              className="form-control"
              value={this.state.rent}
              onChange={this.onChange}
              placeholder="Enter the charge of room per month"
            />
          </div>
          <div className="form-group">
            <label>Address : </label>
            <input
              required
              name="address"
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChange}
              placeholder="Enter the address of room"
            />
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
