import React, { Component } from "react";
import axios from "axios";
import Notifications, { notify } from "react-notify-toast";
export default class CallUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      phone: "",
      phone1: "",
      phone1_error: "",
      phone1_error_bool: false,
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
  phone1validate = () => {
    setTimeout(
      function () {
        if (this.state.phone1.length < 10 || this.state.phone1.length > 10) {
          this.setState({
            phone1_error_bool: true,
            phone1_error: "Phone number must contain 10 numbers",
          });
        } else {
          this.setState({
            phone1_error_bool: false,
            phone1_error: "",
          });
        }
      }.bind(this),
      1000
    );
  };
  onSubmit(e) {
    e.preventDefault();

    const user = {
      number: this.state.phone,
      salesNumber: this.state.phone1,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/call/", user)
      .then((res) => {
        console.log(res.data);
        notify.show("Call Successful", "success", 4000, {
          background: "#90ee90",
          text: "#FFFFFF",
        });
      })
      .catch((err) => {
        console.log(err);
        notify.show("There was some error Try Again", "error", 4000, {
          background: "##c70039",
          text: "#FFFFFF",
        });
      });

    this.setState({
      phone1: "",
      phone: "",
      phone_error: "",
      phone_error_bool: false,
    });
  }

  render() {
    return (
      <div>
        <Notifications options={{ zIndex: 200, top: "50px" }} />
        <h3>Make a Phone Call for assistance</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Enter Your Phone Number: </label>
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
            <label>Enter Sales Phone Number: </label>
            <input
              type="number"
              name="phone1"
              required
              className="form-control"
              value={this.state.phone1}
              onChange={(e) => {
                this.onChangeUsername(e);
                this.phone1validate();
              }}
            />
            <p className="form-error">{this.state.phone1_error}</p>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Call"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
