import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export default class Home extends Component {
  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row bg-title">
            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 className="page-title">Basic Table</h4>{' '}
            </div>
            <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
              {' '}
              <a
                href="http://wrappixel.com/templates/pixeladmin/"
                className="btn btn-danger pull-right m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light"
              >
                Upgrade to Pro
              </a>
              <ol className="breadcrumb">
                <li>
                  <NavLink>Dashboard</NavLink>
                </li>
                <li className="active">Basic Table</li>
              </ol>
            </div>
            {/* /.col-lg-12 */}
          </div>
          {/* /row */}
          <div className="row">
            <div className="col-sm-12">
              <div className="white-box">
                <h3 className="box-title">Basic Table</h3>
                <p className="text-muted">
                  Add class <code>.table</code>
                </p>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Deshmukh</td>
                        <td>Prohaska</td>
                        <td>@Genelia</td>
                        <td>admin</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Deshmukh</td>
                        <td>Gaylord</td>
                        <td>@Ritesh</td>
                        <td>member</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Sanghani</td>
                        <td>Gusikowski</td>
                        <td>@Govinda</td>
                        <td>developer</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Roshan</td>
                        <td>Rogahn</td>
                        <td>@Hritik</td>
                        <td>supporter</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Joshi</td>
                        <td>Hickle</td>
                        <td>@Maruti</td>
                        <td>member</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Nigam</td>
                        <td>Eichmann</td>
                        <td>@Sonu</td>
                        <td>supporter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
        <footer className="footer text-center">
          {' '}
          2017 © Pixel Admin brought to you by wrappixel.com{' '}
        </footer>
      </div>
    );
  }
}
