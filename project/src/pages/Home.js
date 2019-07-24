import React, { Component } from "react";
import home from "../components/logo/home.jpg";
export default class Home extends Component {
  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid container">
          <img className="image-home" src={home} alt="background" />
          <div class="centered">BOOK MANAGEMENT</div>
        </div>
        <footer className="footer text-center">
          {" "}
          thuongthuy@gmail.com || (+84) 856 244 358{" "}
        </footer>
      </div>
    );
  }
}
