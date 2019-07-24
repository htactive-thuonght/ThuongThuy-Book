import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class FormAddCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addCategory = () => {
    this.props.addCategory(this.state.name);
  };

  render() {
    const { name } = this.state;
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="white-box">
                <h3 className="box-title">USER'S INFORMATION</h3>

                <div className="containerTable">
                  <form onSubmit={this.onSubmit} className="formAdd">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter book's quantity"
                        name="name"
                        defaultValue={name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <NavLink to={{ pathname: "/categories" }} className="link">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={this.addCategory}
                    >
                      ADD
                    </button>
                      </NavLink>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
