import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { NavLink } from "react-router-dom";
class ShowBorrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booking: []
    };
  }

  componentDidMount() {
    let listChoose = this.props.firebase.queryBooking();
    listChoose.on("value", snapshot => {
      const object = snapshot.val();
      if (object) {
        const objectList = Object.keys(object).map(key => ({
          ...object[key],
          id: key
        }));

        this.setState({
          booking: objectList
        });
      }
    });
  }
  render() {
    return (
      <div>
        <div className="row">
            <div className="white-box">
              <h3 className="box-title">Booking Table</h3>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Name</th>
                      <th>Borrow date</th>
                      <th>Detail Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.booking.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td >{index + 1}</td>
                          <td>{item.userID}</td>
                          <td>{item.createAt}</td>
                          <td>
                            {" "}
                            <NavLink to={`/detailBook/${item.id}`}>
                              <button className="btn">Detail</button>
                            </NavLink>
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
    );
  }
}
export default withFirebase(ShowBorrow);
