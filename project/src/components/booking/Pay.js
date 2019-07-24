import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      userID: "",
      booking: [],
      paying:[]
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
  listInforUser = () => {
    const listUser = this.props.users.find(
      item => item.id === this.state.userID
    );
    if (listUser) {
      return <h3>User Name: {listUser.name}</h3>;
    }
  };

  pay = () => {
    let list = this.state.booking.filter(
      item => item.userID === this.state.userID
    );
    const data = {
      products: list,
      userID: this.state.userID,
      status:true,
      createAt:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds()
    };
    this.props.firebase.queryPay().push(data);
    // this.props.firebase.booking(this.state.booking.item).remove();
  };

  render() {
    let list = this.state.booking.filter(
      item => item.userID === this.state.userID
    );
    console.log('list ngkjg',list)

    return (
      <div className="pay-book">
        <div className="row-group">
          <div className="form-group user">
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
          <div className="row">
            <ul className="list-group list-borrow">{this.showListUser()}</ul>
          </div>
        </div>
        <div className="row list-user">{this.listInforUser()}</div>
        <div className="row book-detail">
          {list.map((item, index) => {
            return (
              <div className="col-md-12" key={index}>
                {item.products.map((product, index) => {
                  return (
                    <div className="col-md-4" key={index}>
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={product.item.image}
                          alt="Card  cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.item.name}</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="row">
          <button className="btn btn-success" onClick={() => this.pay()}>Pay Book </button>
        </div>
        <footer className="footer text-center">
          {' '}
          thuongthuy@gmail.com || (+84) 856 244 358{' '}
        </footer>
      </div>
    );
  }
}
export default withFirebase(Pay);
