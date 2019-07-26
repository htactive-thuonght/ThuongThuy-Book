import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import Swal from "sweetalert2";
class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      userID: "",
      booking: [],
      paying: [],
      productChoosePay: []
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


  showListem = () => {

    const { users } = this.props;
    const { booking } = this.state;
    let listBooking = "";
    if (users.length > 0) {
      // booking.map(item => item.includes(users));
      listBooking = booking.filter(bk => bk.status === "borrowed").map((item, index) => {
        let user = users.find(user => user.id === item.userID );
        console.log(user,121)
        let userName = "";
        if (user) {
          userName = user.name;
        }
        return (
          <li className="list-group-item" key={item.id}>
          <input
            type="radio"
            name="userID"
            onChange={this.handleChange}
            Value={item.id}
          />
          {userName}
        </li>
        );
      });return listBooking
      
    }

  };

  showListUser = () => {
    let idUser = "-LkgaayWTAo1voGZ3K47";
    // let idUser= this.state.userID
    // const { products } = this.props;
    const { booking } = this.state;
    let listUser = "";
    if (booking.length > 0) {
      listUser = booking.filter(
        item => item.userID === idUser && item.status === "borrowed"
      );

      let listProduct = listUser.map(item =>
        item.products.find(it => it.item.id)
      );
      console.log("list:", listProduct)
     let showList = listProduct.map((product, index) =>{
       
       return (<tr key={index}>
        <td>{index + 1}</td>
        <td>{product.item.name}</td>
        <td>{product.item.type}Ly</td>
        <td>
          <img
            className=""
            src={product.image}
            width="50px"
            alt=""
          />
        </td>
      </tr>)
     });
     return showList;
    }
    return "";
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

  done = () => {
    let list = this.state.booking.filter(
      item => item.userID === this.state.userID
    );
    let a = list.map(item => item.id);
    const data = {
      products: list,
      userID: this.state.userID,
      status: "returned",
      // borrowDate:
      returnDate:
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
    let comfirm = window.confirm(
      "Are you sure you wish to return this books ?"
    );
    if (comfirm) {
      this.props.firebase.queryBorrow(a).set(data);

      Swal.fire({
        title: "Success!",
        text: "Do you want to continue",
        type: "success"
      });
    }
  };

  render() {
    // this.showListem()

    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row bg-title">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Basic Table</h4>
            </div>

            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form role="search" className="app-search hidden-xs">
                  <input
                    type="text"
                    placeholder="Search Users .........."
                    className="form-control"
                    onKeyPress={() => this.searchUser}
                    // name="userSearch"
                    onChange={this.handleChange}
                  />
                </form>

                <div className="table-responsive">
                  <ul className="list-group">{()=>this.showListem()}</ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="white-box">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Book ID</th>
                        <th>Book Name</th>
                        <th>Book Type</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.showListUser()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-success" onClick={() => this.done()}>
            Pay Book{" "}
          </button>
        </div>
        <footer className="footer text-center">
          {" "}
          thuongthuy@gmail.com || (+84) 856 244 358{" "}
        </footer>
      </div>
    );
  }
}
export default withFirebase(Pay);
