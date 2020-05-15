import React, { Component } from "react";
import axios from "axios";
import Notifications, { notify } from "react-notify-toast";
export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      phone: "",
      phone_error: "",
      phone_error_bool: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  phonevalidate = () => {
    setTimeout(
      function () {
        if (this.state.phone.length < 10 || this.state.phone.length > 10) {
          this.setState({
            phone_error_bool: true,
            phone_error: "Phone number must contain 10 numbers",
          });
        } else {
          this.setState({
            phone_error_bool: false,
            phone_error: "",
          });
        }
      }.bind(this),
      1000
    );
  };
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      phoneNumber: this.state.phone,
    };

    console.log(user);

    axios.post("http://localhost:5000/users/add", user).then((res) => {
      console.log(res.data);
      notify.show("User Added !", "success", 4000, {
        background: "#90ee90",
        text: "#FFFFFF",
      });
    });

    this.setState({
      username: "",
      phone: "",
      phone_error: "",
      phone_error_bool: false,
    });
  }

  render() {
    return (
      <div>
        <Notifications options={{ zIndex: 200, top: "50px" }} />
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              name="username"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Phone Number: </label>
            <input
              type="number"
              name="phone"
              required
              className="form-control"
              value={this.state.phone}
              onChange={(e) => {
                this.onChangeUsername(e);
                this.phonevalidate();
              }}
            />
            <p className="form-error">{this.state.phone_error}</p>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
