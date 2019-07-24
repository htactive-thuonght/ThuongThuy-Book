import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import ShowBorrow from "../booking/ShowBorrow";

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
      productChoosed: [],
      valueSearch: "",
      resultSearchProduct: [],
      productID: ""
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

  done = () => {
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
  remove = index => {
    this.state.productsChoose.splice(index, 1);
    this.setState({
      productsChoose: this.state.productsChoose.filter(i => i !== index)
    });
  }

  render() {
    const dataSelected = this.state.productsChoose.map(
      (productsChoose, index) => {
        const { image, name } = productsChoose.item;

        return (
          <div className="col-md-4" key={index}>
            <div className="card">
              <img className="card-img-top" src={image} alt="Card  cap" />
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#sbdhjs" className="btn btn-primary">
                  Quantity: {productsChoose.quantity}
                </a>
                <a></a>
                <button className="btn btn-success" onClick={() => this.remove(index)}>Remove</button>
              </div>
            </div>
          </div>
        );
      }
    );

    return (
      <div className="booking">
        <div className="row-group">
          <div className="form-group search-user">
            <label htmlFor="exampleInputPassword1">Search User:</label>
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
        <div className="row-group">
          <div className="form-group search-user">
            <label htmlFor="exampleInputPassword1">Search Product:</label>
            <input
              type="text"
              className="form-control user-booking"
              placeholder="Enter book's name"
              name="search"
              onKeyPress={this.searchProduct}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 list">
            <div className="white-box">
              <h3 className="box-title">List of Results Product Table</h3>
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
          <div className="row">
            <div className="done-choose">
              <button onClick={() => this.done()} className="btn btn-success">
                Done
              </button>
            </div>
            <div className="col-md-12 list">{dataSelected}</div>
          </div>
        </div>

        <div className="row list-choose">
          <ShowBorrow />
        </div>
        <footer className="footer text-center">
          {' '}
          thuongthuy@gmail.com || (+84) 856 244 358{' '}
        </footer>
      </div>
    );
  }
}

export default withFirebase(Borrow);
