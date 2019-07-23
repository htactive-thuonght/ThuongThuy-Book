import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";

class Borrowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      user: [],
      userID: "",
      valueSearch: "",
      booking: []
    };
  }
  searchUser = event => {
    if (event.target.value) {
      var listUser = this.props.users;
      listUser = listUser.filter(item => {
        return (
          item.name.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1
        );
      });
      this.setState({ user: listUser });
    }
  };
  showListUser = () => {
    const { user } = this.state;
    if (user) {
      const listUserSearch = user.map(item => (
        <li className="list-group-item" key={item.id}>
          <input
            type="radio"
            name="userID"
            onChange={this.handleChange}
            value={item.id}
          />
          {item.name}
        </li>
      ));
      return listUserSearch;
    }
  };

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  };

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

  // done = () => {
  //   const data = {
  //     products: this.state.productsChoose,
  //     userID: this.state.userID
  //   };
  //   this.props.firebase.queryBorrowing().push(data);
  // };

  render() {
    console.log(this.state.userID, 'hfshf');
    let list = this.state.booking.filter(
      item => item.userID === this.state.userID
    );
    console.log('list', list)
    let a = list.products
    console.log(a, 'jkhih');
   

    return (
      <div className="booking">
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Name User</label>
          <input
            type="text"
            className="form-control user-booking"
            placeholder="Enter user name"
            name="valueSearch"
            onKeyPress={this.searchUser}
            onChange={this.handleChange}
          />
        </div>

        <div className="table-responsive">
          <ul className="list-group">{this.showListUser()}</ul>
        </div>
       
        <div className="row">

          <div className="col-md-4" >
            <div className="card">
              <img
                className="card-img-top"
                src=''
                alt="Card  cap"
              />
              <div className="card-body">
                <h5 className="card-title">'bjkb'</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default withFirebase(Borrowing);
