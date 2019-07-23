import React from "react";
import Header from "./components/layout/Header";
import LeftMenu from "./components/layout/LeftMenu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import { withFirebase } from "./components/Firebase/context";

import "./App.css";

import ProductList from "./components/products/ProductList";
import FormAddBook from "./components/products/FormAddBook";
import FormUpdateBook from "./components/products/FormUpdateBook";

import CategoriesList from "./components/categories/CategoriesList";
import FormAddCategories from "./components/categories/FormAddCategories";
import FormUpdateCate from "./components/categories/FormUpdateCate";

import UserList from "./components/users/UserList";
import FormAddUser from "./components/users/FormAddUser";
import FormUpdateUser from "./components/users/FormUpdateUser";

import Booking from "./components/booking/Booking";
import Pay from "./components/booking/Pay";
import Borrow from "./components/booking/Borrow";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      users: []
    };
  }

  getTableCall(table, index) {
    switch (table) {
      case "categories": {
        return this.props.firebase.getCategories(index);
      }
      case "products": {
        return this.props.firebase.books(index);
      }
      case "users": {
        return this.props.firebase.users(index);
      }
      default: {
        return "";
      }
    }
  }

  getData = table => {
    let tableCall = this.getTableCall(table);
    tableCall.on("value", snapshot => {
      const object = snapshot.val();
      if (object) {
        const objectList = Object.keys(object).map(key => ({
          ...object[key],
          id: key
        }));
        this.setState({
          [table]: objectList
        });
      } else {
        this.setState({
          [table]: []
        });
      }
    });
  };

  componentDidMount() {
    this.getData("categories");
    this.getData("products");
    this.getData("users");
  }

  addCategory = name => {
    this.props.firebase.getCategories().push({ name });
    this.setState({
      name: ""
    });
  };

  deleteCategory = index => {
    this.props.firebase.categories(index).remove();
  };

  editCategories = (index, data) => {
    this.props.firebase.categories(index).set({
      name: data
    });
  };

  addUser = user => {
    const { name, age, image, classes, phone } = user;
    this.props.firebase.users().push({ name, age, image, classes, phone });
  };

  deleteUser = index => {
    this.props.firebase.queryUsers(index).remove();
  };

  editUser = (index, data) => {
    // console.log("object", data);
    const { image, value } = data;
    this.props.firebase.queryUsers(index).set({
      image: image || value.image,
      name: value.name,
      classes: value.classes,
      phone: value.phone,
      age: value.age
    });
  };

  addBook = book => {
    // console.log(book);
    const { name, type, quantity, quantityRemain, image } = book;
    this.props.firebase
      .books()
      .push({ name, type, quantity, quantityRemain, image });
  };

  deleteBook = index => {
    this.props.firebase.queryBooks(index).remove();
  };

  editBook = (index, data) => {
    console.log("object", data);
    const { image, value } = data;
    this.props.firebase.queryBooks(index).set({
      image: image || value.image,
      name: value.name,
      type: value.type,
      quantity: value.quantity,
      quantityRemain: value.quantityRemain
    });
  };

  render() {
    const { categories, products, users } = this.state;
    return (
      <Router>
        <Header />
        <div className="app-main">
          <LeftMenu />
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route
              path="/users"
              component={() => (
                <UserList users={users} deleteUser={this.deleteUser} />
              )}
            />
            <Route
              path="/books"
              component={() => (
                <ProductList products={products} deleteBook={this.deleteBook} />
              )}
            />
            <Route
              path="/categories"
              component={() => (
                <CategoriesList
                  categories={categories}
                  deleteCategory={this.deleteCategory}
                />
              )}
            />
            <Route
              path="/booking"
              component={() => <Booking users={users} />}
            />
          </Switch>
          <Switch>
            <Route
              exact
              path="/borrow/:id"
              component={match => (
                <Borrow users={users} match={match} products={products} />
              )}
            />
            <Route path="/pay" component={() => <Pay />} />
          </Switch>
          <Route
            path="/addBook"
            component={() => (
              <FormAddBook
                categories={categories}
                products={products}
                addBook={this.addBook}
              />
            )}
          />
          <Route
            path="/updateBook/:id"
            component={match => (
              <FormUpdateBook
                categories={categories}
                products={products}
                editBook={this.editBook}
                match={match}
              />
            )}
          />
          <Route
            path="/updateCategory/:id"
            component={match => (
              <FormUpdateCate
                categories={categories}
                editCategories={this.editCategories}
                match={match}
              />
            )}
          />
          <Route
            path="/addCategory"
            component={() => (
              <FormAddCategories
                categories={categories}
                addCategory={this.addCategory}
              />
            )}
          />

          <Route
            path="/addUser"
            component={() => <FormAddUser addUser={this.addUser} />}
          />
          <Route
            path="/updateUser/:id"
            component={match => (
              <FormUpdateUser
                users={users}
                editUser={this.editUser}
                match={match}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
