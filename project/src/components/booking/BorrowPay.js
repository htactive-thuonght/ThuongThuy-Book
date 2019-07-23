import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class BorrowPay extends Component {
  render() {
    return (
      <div>
        <NavLink to={`/updateUser/${item.id}`}>
          <button>PAY</button>
        </NavLink>

        <button>BORROWING</button>
      </div>
    );
  }
}
