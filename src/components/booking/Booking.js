import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { Link } from "react-router-dom";

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
        <div className="container-fluid">
          <div className="row bg-title">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Basic Table</h4>{" "}
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              {" "}
              <Link
                className=" pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
                to={{ pathname: "/borrow" }}
              >
                BORROW
              </Link>
              <Link
                className="  pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
                to={{ pathname: "/pay" }}
              >
                PAY
              </Link>
            </div>
            {/* /.col-lg-12 */}
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="white-box">
                <h3 className="box-title">User Table</h3>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>NAME </th>
                        <th>AGE </th>
                        <th>PHONE </th>
                        <th>CLASS </th>
                        <th>IMAGE </th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.users.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.phone}</td>
                            <td>{item.classes}</td>
                            <td>
                              <img
                                src={item.image}
                                style={{ width: "50px", height: "50px" }}
                                alt=""
                              />
                            </td>
                            <td className="link">
                              <Link className="link" to={`/borrow/${item.id}`}>
                                Borrow
                              </Link>
                              &ensp;
                              <Link className="link" to={`/pay/${item.id}`}>
                                Pay
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
