import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withFirebase } from "../Firebase/context";

class FormUpdateBook extends Component {
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
  handleImage = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      const image = e.target.files[0];
      console.log("imga", image);
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    if (image) {
      const uploadTask = this.props.firebase.storage
        .ref(`images/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          console.log(error);
        },
        () => {
          this.props.firebase.storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              this.props.editBook(this.state.value.id, {
                value: this.state.value,
                image: url
              });
            });
        }
      );
    }
    this.props.editBook(this.state.value.id, {
      value: this.state.value
    });
  };

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
    this.handleUpload();
  };
  render() {
    let book = this.state.value;
    const { categories } = this.props;

    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="white-box">
                <h3 className="box-title">UPDATE BOOKS</h3>

                <div className="containerTable">
                  <form onSubmit={this.onSubmit} className="formAdd">
                    <div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter book's quantity"
                          name="name"
                          defaultValue={book.name}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Type</label>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          name="type"
                          defaultValue={book.type}
                          onChange={this.handleChange}
                        >
                          {categories.map((item, index) => (
                            <option key={index}>{item.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">QUANTITY</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter book's quantity"
                          name="phone"
                          defaultValue={book.quantity}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">
                          QUANTITY REMAIN
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter book's quantity remain"
                          name="quantityRemain"
                          defaultValue={book.quantityRemain}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <img
                          width="60px"
                          src={book.image}
                          className="img-fluid"
                          alt=""
                        />
                        <label htmlFor="exampleInputPassword1">IMAGE</label>
                        <input
                          type="file"
                          className="form-control-file"
                          name="img"
                          onChange={this.handleImage}
                        />
                      </div>
                      <NavLink to={{ pathname: "/books" }} className="link">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={this.editBook}
                        >
                          UPDATE
                        </button>
                      </NavLink>
                    </div>
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
export default withFirebase(FormUpdateBook);
