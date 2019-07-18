import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class ProductList extends Component {
  deleteBook = id => {
    this.props.deleteBook(id);
  };
  render() {
    return (
      <div className="product-list">
        <div>
          <NavLink to={{ pathname: "/addProduct" }} className="link">
            <button type="button" className="btn btn-success">
              Add Book <i className="fa fa-plus" />
            </button>
          </NavLink>
        </div>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">LIST OF PRODUCTS</h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>NAME PRODUCT</th>
                    <th>TYPE</th>
                    <th>QUANTITY</th>
                    <th>STATUS</th>
                    <th>IMAGE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody id="productList">
                  {this.props.products.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.quantity}</td>
                        <td>{item.status}</td>
                        <td><img  src={item.image} alt='' style={{ width: "50px", height: "50px" }}/></td>
                        <td>
                          <i className="fa fa-trash" onClick={() => this.deleteBook(item.id)}/>
                          <NavLink to={`/updateBook/${item.id}`}>
                            <i className="fa fa-pencil" />
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
    );
  }
}
