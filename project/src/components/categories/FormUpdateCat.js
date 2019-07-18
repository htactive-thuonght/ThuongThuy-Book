import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class FormUpdateCat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  editCategories = (id, data) => {
    this.props.editCategories(id, data);
  };

  render() {
    const book = this.props.match;
    const book_id = book.match.params.id;
    const books = this.props.categories;
    const listBook = books.filter(item => item.id === book_id);
    return (
      <div className="add-product">
        <div className="panel-heading-add">
          <h3 className="panel-title">UPDATE CATEGORY</h3>
        </div>
        <form>
          {listBook.map((item, index) => {
            return (
              <div key={index}>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Name category</label>
                  <input
                    type="text"
                    className="form-control form-dai"
                    id="formGroupExampleInput"
                    name="name"
                    defaultValue={item.name}
                    onChange={this.handleChange}
                  />
                </div>
                <NavLink to={{ pathname: "/categories" }} className="link">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() =>
                      this.editCategories(item.id, this.state.value)
                    }
                  >
                    UPDATE
                  </button>
                </NavLink>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}
