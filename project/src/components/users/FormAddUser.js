import React from "react";
import { withFirebase } from "../Firebase/context";

class FormAddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      image: "",
      arrClass: ["PNV20A", "PNV20B", "PNV19A", "PNV19B", "PNV21A", "PNV21B"]
    };
  }

  addUser = () => {
    this.handleUpload();
    setTimeout(this.handleHide, 2000);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleImage = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    console.log("ima", image);
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
            this.props.addUser({
              ...this.state,
              image: url
            });
          });
      }
    );
  };

  render() {
    const { name, age, image, classes, phone } = this.state;
    //let { show } = this.state;
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
                      <label htmlFor="exampleInputPassword1">NAME</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter book's quantity"
                        name="name"
                        defaultValue={name}
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
                        defaultValue={age}
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
                        defaultValue={phone}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">CLASS</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        name="classes"
                        defaultValue={classes}
                        onChange={this.handleChange}
                      >
                        {this.state.arrClass.map((item, index) => (
                          <option key={index}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">IMAGE</label>
                      <input
                        type="file"
                        className="form-control-file"
                        name="image"
                        defaultValue={image}
                        onChange={this.handleImage}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={this.addUser}
                    >
                      ADD
                    </button>
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

export default withFirebase(FormAddUser);
// export default AddBook;
