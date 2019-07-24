import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";

class ShowDetailBook extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.match.params.id);
    this.state = {
      booking: []
    };
  }
  componentDidMount() {
    let listChoose = this.props.firebase.queryBooking();
    listChoose.on("value", snapshot => {
      const object = snapshot.val();
      if (object) {
        const objectList = Object.keys(object).map(key => ({
          ...object[key],
          id: key
        }));

        this.setState({
          booking: objectList
        });
      }
    });
  }

  listInforUser = () => {
    const listUserID = this.props.users.map(item => item.id);
    const listBookingID = this.state.booking.map(item => item.userID);
    for (let i = 0; i < listUserID.length; i++) {
      for (let j = 0; j < listBookingID.length; j++) {
        if (listUserID[i] === listBookingID[j]) return listUserID[i];
      }
    }
  };
  result = () => {
    let a = this.listInforUser();
    let listUser = this.props.users.find(item => item.id === a);
    if (listUser) {
      return <h3>User Name: {listUser.name}</h3>;
    }
  };

  render() {
    let list = this.state.booking.filter(
      item => item.id === this.props.match.match.params.id
    );
    return (
      <div>
        <div className="row list-user">{this.result()}</div>
        <div className="row book-detail-borrow">
          {list.map((item, index) => {
            return (
              <div className="col-md-12" key={index}>
                {item.products.map((product, index) => {
                  return (
                    <div className="col-md-4" key={index}>
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={product.item.image}
                          alt="Card  cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.item.name}</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <footer className="footer text-center">
          {' '}
          thuongthuy@gmail.com || (+84) 856 244 358{' '}
        </footer>
      </div>
    );
  }
}
export default withFirebase(ShowDetailBook);
