import React, { Component } from "react";

export default class FormUpdateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  editBook = (id, data) => {
    this.props.editBook(id, data);
  };

  render() {
    const book = this.props.match;
    const book_id = book.match.params.id;
    const books = this.props.products;
    const listBook = books.filter(item => item.id === book_id);
    console.log(listBook);
    return (
      <div className="add-product">
        <div className="panel-heading-add">
          <h3 className="panel-title">UPDATE PRODUCT</h3>
        </div>
        <form>
          {listBook.map((item, index) => {
            return (
              <div key={index}>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Name</label>
                  <input
                    type="text"
                    className="form-control form-dai"
                    id="formGroupExampleInput"
                    name="name"
                    defaultValue={item.name}
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
                    defaultValue={item.type}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Quantity</label>
                  <input
                    type="number"
                    className="form-control form-dai"
                    id="formGroupExampleInput"
                    name="quantity"
                    defaultValue={item.quantity}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Status</label>
                  <input
                    type="number"
                    className="form-control form-dai"
                    id="formGroupExampleInput"
                    name="status"
                    defaultValue={item.status}
                    onChange={this.handleChange}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Image</label>
                  <input
                    type="file"
                    className="form-control-file form-dai"
                    id="formGroupExampleInput"
                    name="image"
                    defaultValue={item.image}
                    onChange={this.handleImage}
                  />
                </div> */}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => this.editBook(item.id, this.state.value)}
                >
                  ADD
                </button>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
}
