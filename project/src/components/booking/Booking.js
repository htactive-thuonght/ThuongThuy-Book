import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import ShowBooking from "../booking/ShowBooking";

const data = [];
let count = 0;

class Booking extends Component {
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
      const listProductSearch = resultSearchProduct.map((item,index) => (
        <div className="col-md-4" key={index}>
        <div className="card">
          <img className="card-img-top" src={item.image} alt="Card  cap" />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a
              href="#sbdhjs"
              onClick={() => this.add(index)}
              className="btn btn-primary"
            >
              Add
            </a>
          </div>
        </div>
      </div>
      ));
      return listProductSearch;
    }
  };

  done = () => {
    const data = {
      products: this.state.productsChoose,
      userID: this.state.userID,
      createAt:  new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate() +' '+ new Date().getHours()+':'+ new Date().getMinutes()+':'+ new Date().getSeconds()
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

  render() {
  // let new Date() = new Date();
  let date = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate() +' '+ new Date().getHours()+':'+ new Date().getMinutes()+':'+ new Date().getSeconds();
  const currDate = "Current Date= "+date;
console.log('bay gio la bao hieu', currDate);
console.log('id', this.state.user.id)

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
              </div>
            </div>
          </div>
        );
      }
    );

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

        <div className="row form-group">
          <input
            type="text"
            name="search"
            className="form-control col-md-4"
            placeholder="Enter key word"
            onKeyPress={this.searchProduct}
            onChange={this.handleChange}
          />
        </div>
        <div className="row">
          <div className="col-md-6 left-show">{this.resultSearchProduct()}</div>
          <div className="col-md-6">
            {dataSelected}
            <div className="done-choose">
              <button onClick={() => this.done()} className="btn btn-success">
                Done
              </button>
            </div>
          </div>
        </div>
        <div className="row list-choose">
          {/* <ShowBooking /> */}
        </div>
      </div>
    );
  }
}

export default withFirebase(Booking);
