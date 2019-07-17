import React, { Component } from "react";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="app-header header-shadow">
          <div className="app-header__logo">
            <div className="logo-src" />
            <div className="header__pane ml-auto">
              <div>
                <button
                  type="button"
                  className="hamburger close-sidebar-btn hamburger--elastic"
                  data-class="closed-sidebar"
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="app-header__mobile-menu">
            <div>
              <button
                type="button"
                className="hamburger hamburger--elastic mobile-toggle-nav"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
          <div className="app-header__menu">
            <span>
              <button
                type="button"
                className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
              >
                <span className="btn-icon-wrapper">
                  <i className="fa fa-ellipsis" />
                </span>
              </button>
            </span>
          </div>{" "}
          <div className="app-header__content">
            <div className="app-header-left">
              <div className="search-wrapper">
                <div className="input-holder">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Type to search"
                  />
                  <button className="search-icon">
                    <span />
                  </button>
                </div>
                <button className="close" />
              </div>
              <ul className="header-menu nav">
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <i className="nav-link-icon fa fa-database"> </i>
                    Statistics
                  </a>
                </li>
                <li className="btn-group nav-item">
                  <a href="/" className="nav-link">
                    <i className="nav-link-icon fa fa-edit" />
                    Projects
                  </a>
                </li>
                <li className="dropdown nav-item">
                  <a href="/" className="nav-link">
                    <i className="nav-link-icon fa fa-cog" />
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>{" "}
        <div className="ui-theme-settings">
          <button
            type="button"
            id="TooltipDemo"
            className="btn-open-options btn btn-warning"
          >
            <i className="fa fa-cog fa-w-16 fa-spin fa-2x" />
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
