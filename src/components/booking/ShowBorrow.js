import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";

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
    const userID = this.props.id;
    const user = this.props.users;
    const items = user.filter(item => item.id === userID);

    return (
      <div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Description</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {items.map((item, index) => {
                  return (
                    <>
                      <td key={index + 1}>{index + 1}</td>
                      <td key={item.id}>{item.id}</td>
                      <td key={index}>{item.name}</td>
                    </>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withFirebase(ShowBorrow);
