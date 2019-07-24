import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class ProductList extends Component {
  deleteBook = id => {
    this.props.deleteBook(id);
  };
  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row bg-title">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Basic Table</h4>{" "}
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              {" "}
              <NavLink
                to={{ pathname: "/addBook" }}
                className="btn btn-danger pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
              >
                Add
              </NavLink>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="white-box">
                <h3 className="box-title">Basic Table</h3>
                <p className="text-muted">
                  Add class <code>.table</code>
                </p>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>NAME PRODUCT</th>
                        <th>TYPE</th>
                        <th>QUANTITY</th>
                        <th>QUANTITY REMAIN</th>
                        <th>IMAGE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.products.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.quantity}</td>
                            <td>{item.quantityRemain}</td>
                            <td>
                              <img
                                src={item.image}
                                style={{ width: "50px", height: "50px" }}
                                alt=""
                              />
                            </td>
                            <td>
                              <NavLink onClick={() => this.deleteBook(item.id)}>
                                Delete
                              </NavLink>
                              &ensp;
                              <NavLink to={`/updateBook/${item.id}`}>
                                Update
                              </NavLink>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
        <footer className="footer text-center">
          {" "}
          thuongthuy@gmail.com || (+84) 856 244 358{" "}
        </footer>
      </div>
    );
  }
}
