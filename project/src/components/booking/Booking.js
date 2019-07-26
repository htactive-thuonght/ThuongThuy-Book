import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { Link } from "react-router-dom";

class Booking extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
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
    const { users } = this.props;
    const { booking } = this.state;
    let listBooking = "";
    if (users.length > 0) {
      listBooking = booking.filter(bk => bk.status === "Borrowed").map((item, index) => {
        let user = users.find(user => user.id === item.userID );
        let userName = "";
        if (user) {
          userName = user.name;
        }
        return (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{userName}</td>
            <td>{item.status}</td>
            <td>{item.borrowDate}</td>
            <td>
              {" "}
              <Link to={`/detailBook/${item.id}`}>
                <button className=" btn-default ">Detail</button>
              </Link>{" "}
              &ensp;
              <Link to={`/detailBook/${item.id}`}>
                <button className=" btn-default">Pay</button>
              </Link>
            </td>
          </tr>
        );
      });
    }
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row bg-title">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Booking Table</h4>{" "}
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
                        <th>User Name</th>
                        <th>Status</th>
                        <th>Borrow date</th>
                       
                        <th>Detail Booking</th>
                      </tr>
                    </thead>
                    <tbody>{listBooking}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Booking);
