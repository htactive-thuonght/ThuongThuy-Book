import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { NavLink } from "react-router-dom";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: []
    };
  }

  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid container">
        {/* <img className="image-home" src={home} alt="background" /> */}
        <div className="row booking-page">
          <NavLink to={`/borrow`}>
            <button className="btn btn-success btn-borrow-pay"><h2>Borrow Book</h2></button>
          </NavLink>
          <NavLink to={`/pay`}>
            <button className="btn btn-success btn-borrow-pay"><h2>Pay Book</h2></button>
          </NavLink>
        </div>
        </div>
        
        <footer className="footer text-center">
          {" "}
          2017 © Pixel Admin brought to you by wrappixel.com{" "}
        </footer>
      </div>
    );
  }
}

export default withFirebase(Booking);
