import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { Link } from "react-router-dom";
const data = [];
let count = 0;

class Borrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsChoose: [],
      booking: [],
      user: [],
      userID: "",
      valueSearch: "",
      resultSearchProduct: [],
      productID: ""
    };
  }
  componentDidMount() {
    let products = this.props.firebase.books();
    products.on("value", snapshot => {
      const object = snapshot.val();

      if (object) {
        const objectList = Object.keys(object).map(key => ({
          ...object[key],
          id: key
        }));
        this.setState({
          products: objectList
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

  searchProduct = event => {
    if (event.target.value) {
      var listProduct = this.state.products;
      listProduct = listProduct.filter(item => {
        return (
          item.name.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1
        );
      });
      this.setState({ resultSearchProduct: listProduct });
    }
  };

  resultSearchProduct = () => {
    const { resultSearchProduct } = this.state;
    if (resultSearchProduct) {
      const listProductSearch = resultSearchProduct.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>1</td>
          <td>
            <img src={item.image} width="50px" alt="" />
          </td>
          <td>
            <a
              href="#sbdhjs"
              onClick={() => this.add(index)}
              className="btn btn-primary"
            >
              Add
            </a>
          </td>
        </tr>
      ));
      return listProductSearch;
    }
  };
  add = id => {
    const { resultSearchProduct } = this.state;
    count = 0;
    if (!data.length) {
      data.push({
        item: this.state.resultSearchProduct[id],
        quantity: 1
      });
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].item.id === resultSearchProduct[id].id) {
          count++;
          data[i].quantity += 1;
        }
      }

      if (!count) {
        data.push({
          item: this.state.resultSearchProduct[id],
          quantity: 1
        });
      }
    }

    this.setState({
      productsChoose: data
    });
  };

  resultAdd = () => {
    const { selectItem } = this.state.productsChoose;
    if (selectItem) {
      const itemadd = selectItem.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>1</td>
          <td>
            <img src={item.image} width="50px" alt="" />
          </td>
          <td>
            <a
              href="#sbdhjs"
              onClick={() => this.add(index)}
              className="btn btn-primary"
            >
              Add
            </a>
          </td>
        </tr>
      ));
      return itemadd;
    }
  };
  remove = index => {
    this.state.productsChoose.splice(index, 1);
    this.setState({
      productsChoose: this.state.productsChoose.filter(i => i !== index)
    });
  };

  doneBooking = () => {
    const data = {
      products: this.state.productsChoose,
      userID: this.state.userID,
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
    this.props.firebase.queryBooking().push(data);
    alert("Booking success");
  };

  render() {
    const dataSelected = this.state.productsChoose.map(
      (productsChoose, index) => {
        const { image, name, id, quantity } = productsChoose.item;

        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{id}</td>
            <td>{quantity}</td>
            <td>
              <img src={image} width="50px" alt="" />
            </td>
            <td>
              <button
                className="btn btn-success"
                onClick={() => this.remove(index)}
              >
                Remove
              </button>
            </td>
          </tr>
        );
      }
    );

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
                    onKeyPress={this.searchUser}
                    onChange={this.handleChange}
                  />
                </form>

                <div className="table-responsive">
                  <ul className="list-group">{this.showListUser()}</ul>
                </div>
              </div>

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form role="search" className="app-search hidden-xs">
                  <input
                    type="text"
                    placeholder="Search Books .........."
                    className="form-control"
                    onKeyPress={this.searchProduct}
                    onChange={this.handleChange}
                  />
                </form>
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
                        <th>Quatity</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{this.resultSearchProduct()}</tbody>
                  </table>
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
                        <th>Quatity</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{dataSelected}</tbody>
                  </table>
                  <Link to={{ pathname: "/booking" }}>
                    <button
                      id="buttonDF"
                      className="btn btn-success"
                      onClick={() => this.doneBooking()}
                      style={{ marginLeft: "45%" }}
                    >
                      Done
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(Borrow);
