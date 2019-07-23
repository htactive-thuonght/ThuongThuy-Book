import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { Link } from "react-router-dom";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsChoose: [],
      booking: []
    };
  }

  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row bg-title">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Basic Table</h4>{" "}
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12"> </div>
            {/* /.col-lg-12 */}
          </div>
          {/* /row */}
          <div className="row">
            <div className="col-sm-12">
              <div className="white-box">
                <h3 className="box-title">Basic Table</h3>
                <p className="text-muted">
                  Add class <code>.table</code>
                </p>
                <div className="table-responsive" />
              </div>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
        <footer className="footer text-center">
          {" "}
          2017 © Pixel Admin brought to you by wrappixel.com{" "}
        </footer>
      </div>
    );
  }
}

export default withFirebase(Booking);
