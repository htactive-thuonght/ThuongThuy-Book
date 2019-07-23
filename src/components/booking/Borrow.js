import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import ShowBorrow from "./ShowBorrow";

// const data = [];
// let count = 0;

class Borrow extends Component {
  constructor(props) {
    super(props);
    // console.log(props.users);
    this.state = {
      products: [],
      productsChoose: [],
      booking: [],
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

  // resultSearchProduct = () => {
  //   const { resultSearchProduct } = this.state;
  //   if (resultSearchProduct) {
  //     const listProductSearch = resultSearchProduct.map((item, index) => (

  //           <tbody>
  //             <tr>
  //               {items.map((item, index) => {
  //                 return (
  //                   <>
  //                     <td key={index + 1}>{index + 1}</td>
  //                     <td key={item.id}>{item.id}</td>
  //                     <td key={index}>{item.name}</td>
  //                   </>
  //                 );
  //               })}
  //             </tr>
  //           </tbody>

  //       </div>
  //     ));
  //     return listProductSearch;
  //   }
  // };

  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row bg-title">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Basic Table</h4>
            </div>

            <form role="search" className="app-search hidden-xs">
              <input
                type="text"
                placeholder="Search book..."
                className="form-control"
                onKeyPress={this.searchProduct}
                onChange={this.handleChange}
              />
            </form>

            <div className="table-responsive">
              <ul className="list-group" />
            </div>
          </div>

          {/* <div className="row">
            <div className="col-sm-12">
              <div className="white-box">
                <h3 className="box-title">Basic Table</h3>
                <ShowBorrow
                  id={this.props.match.match.params.id}
                  users={this.props.users}
                />
              </div>
            </div>
          </div> */}
        </div>

        <footer className="footer text-center">
          2017 © Pixel Admin brought to you by wrappixel.com{" "}
        </footer>
      </div>
    );
  }
}

export default withFirebase(Borrow);
