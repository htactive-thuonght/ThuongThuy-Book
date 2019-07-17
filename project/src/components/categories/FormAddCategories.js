import React, { Component } from "react";

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
  }

  render() {
    return (
      <div className="add-product">
        <div className="panel-heading-add">
          <h3 className="panel-title">ADD CATEGORY</h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Name category</label>
            <input
              type="text"
              className="form-control form-dai"
              id="formGroupExampleInput"
              name="name"
              defaultValue={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <button type="button" className="btn btn-success" onClick={this.addCategory}>
            ADD
          </button>
        </form>
      </div>
    );
  }
}
