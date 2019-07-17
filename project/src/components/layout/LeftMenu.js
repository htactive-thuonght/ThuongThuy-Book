import React from "react";
import { NavLink } from "react-router-dom";
class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
          <div className="app-sidebar sidebar-shadow">
            <div className="scrollbar-sidebar menu-left" >
              <div className="app-sidebar__inner">
                <ul className="vertical-nav-menu">
                  <li className="app-sidebar__heading">UI Tables</li>
                  <li>
                    <NavLink to={{ pathname: "/user" }} className="link">
                      <i className="fa fa-table" />
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={{ pathname: "/categories" }} className="link">
                      <i className="fa fa-book" />
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={{ pathname: "/book" }} className="link">
                      <i className="fa fa-book" />
                      Books
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default LeftMenu;
