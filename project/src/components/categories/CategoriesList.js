import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteCategory = id => {
    this.props.deleteCategory(id);
  };

  render() {
    return (
      <div className="cat-list">
        <div>
          <NavLink to={{ pathname: "/addCategory" }} className="link">
            <button type="button" className="btn btn-success">
              Add Category <i className="fa fa-plus" />
            </button>
          </NavLink>
        </div>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">LIST OF CATEGORIES</h3>
          </div>
          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>NAME CATEGORIES</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody id="categoryList">
                  {this.props.categories.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{item.name}</td>
                        <td>
                          <i
                            className="fa fa-trash"
                            onClick={() => this.deleteCategory(item.id)}
                          />
                          <NavLink to={`/updateCat/${item.id}`}>
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
