import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import { NavLink } from "react-router-dom";

class FormUpdateUser extends Component {
  constructor(props) {
    super(props);
    // console.log(props.users);
    const book_id = this.props.match.match.params.id;
    const books = this.props.users;
    let book = {};
    if (books.length > 0 && books) {
      book = books.find(item => item.id === String(book_id));
    }
    this.state = {
      value: book,
      data: []
    };
    console.log(props);
  }
  handleImage = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      const image = e.target.files[0];

      this.setState(() => ({ image }));
    }
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

  editUser = e => {
    e.preventDefault();
    this.handleUpload();
    // this.props.editUser(this.state.value.id, this.state.value);
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
              this.props.editUser(this.state.value.id, {
                value: this.state.value,
                image: url
              });
            });
        }
      );
    }
    this.props.editUser(this.state.value.id, {
      value: this.state.value
    });
  };

  render() {
    console.log(this.state.value);
    let user = this.state.value;
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="white-box">
                <h3 className="box-title">UPDATE CATEGORY</h3>

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
                          defaultValue={user.name}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">AGE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter book's name"
                          name="age"
                          defaultValue={user.age}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">PHONE</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter book's quantity"
                          name="phone"
                          defaultValue={user.phone}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">CLASS</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter book's status"
                          name="classes"
                          defaultValue={user.classes}
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <br />
                        <label htmlFor="exampleInputPassword1">IMAGE</label>

                        <div class="row">
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <input
                              type="file"
                              className="form-control-file"
                              name="img"
                              // defaultValue={user.img}
                              onChange={this.handleImage}
                            />
                          </div>
                          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <img
                              width="100px"
                              src={user.image}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <NavLink to={{ pathname: "/users" }} className="link">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={this.editUser}
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
export default withFirebase(FormUpdateUser);
