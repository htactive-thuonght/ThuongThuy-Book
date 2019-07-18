import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { NavLink } from "react-router-dom";
class FormAddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      image: "",
      url: ""
    };
  }

  addBook = () => {
    this.handleUpload();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({ image });
    }
  };
  handleUpload = () => {
    const { image } = this.state;
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
        console.log("oki loi nhe", error);
      },
      () => {
        this.props.firebase.storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.props.addBook({
              ...this.state,
              image: url
            });
          });
      }
    );
    console.log("object");
  };

  render() {
    const { nameBook, type, quantity, image, status } = this.state;
    return (
      <div className="add-product">
        <div className="panel-heading-add">
          <h3 className="panel-title">ADD PRODUCT</h3>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Name</label>
            <input
              type="text"
              className="form-control form-dai"
              id="formGroupExampleInput"
              name="name"
              defaultValue={nameBook}
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
              defaultValue={type}
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
              defaultValue={quantity}
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
              defaultValue={status}
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
              defaultValue={image}
              onChange={this.handleImage}
            />
          </div>
          <NavLink to={{ pathname: "/book" }} className="link">
          <button
            type="button"
            className="btn btn-success"
            onClick={this.addBook}
          >
            ADD
          </button>
          </NavLink>
        </form>
      </div>
    );
  }
}
export default withFirebase(FormAddProduct);
