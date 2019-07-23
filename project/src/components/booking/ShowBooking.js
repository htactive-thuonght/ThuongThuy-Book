import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
class ShowBooking extends Component {
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
          <div className="col-sm-12">
            <div className="white-box">
              <h3 className="box-title">Basic Table</h3>
              <p className="text-muted">
                Add class <code>.table</code>
              </p>
              {this.state.booking.map(item => {
                return <p key={item.id}>User ID: {item.userId}</p>;
              })}

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name Product</th>
                      <th>Image</th>
                      <th>quantity</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.booking.map((item, index) => { 
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          {item.products.map((product, index) => {
                            return (
                              <tr key={index}>
                                <td>{product.item.name}</td>
                                <td>
                                  <img
                                    style={{ width: "50px", height: "50px" }}
                                    alt=""
                                    src={product.item.image}
                                  />
                                </td>
                                <td>{product.quantity}</td>
                              </tr>
                            );
                          })}
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
    );
  }
}
export default withFirebase(ShowBooking);
