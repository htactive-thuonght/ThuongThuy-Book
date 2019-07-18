import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class FormUpdateBook extends Component {
  constructor(props) {
    super(props);
    const book_id = this.props.match.match.params.id;
    const books = this.props.products;
    let book = {};
    if (books.length > 0 && books) {
      book = books.find(item => item.id === String(book_id));
    }
    this.state = {
      value: book
    };
  }

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      value: {
        ...prevState.value,
        [name]: value
      }
    }));
  };

  editBook = () => {
    this.props.editBook(this.state.value.id, this.state.value);
  };

  
  render() {
    let book = this.state.value;
    return (
      <div className="add-product">
        <div className="panel-heading-add">
          <h3 className="panel-title">UPDATE PRODUCT</h3>
        </div>
        <form>
          <div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Name</label>
              <input
                type="text"
                className="form-control form-dai"
                id="formGroupExampleInput"
                name="name"
                defaultValue={book.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">type</label>
              <input
                type="text"
                className="form-control form-dai"
                id="formGroupExampleInput"
                name="type"
                defaultValue={book.type}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Quantity</label>
              <input
              min="0"
                type="number"
                className="form-control form-dai"
                id="formGroupExampleInput"
                name="quantity"
                defaultValue={book.quantity}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Status</label>
              <input
               min="0" max="1"
                type="number"
                className="form-control form-dai"
                id="formGroupExampleInput"
                name="status"
                defaultValue={book.status}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Image</label>
              <input
                type="file"
                className="form-control-file form-dai"
                id="formGroupExampleInput"
                name="image"
              />
            </div>
            <NavLink to={{ pathname: "/book" }} className="link">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.editBook}
                onChange={this.handleImage}
              >
                UPDATE
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}
