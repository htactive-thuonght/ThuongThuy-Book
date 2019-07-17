import React from "react";
import Header from "./components/layout/Header";
import LeftMenu from "./components/layout/LeftMenu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import { withFirebase } from "./components/Firebase/context";

import "./App.css";
import ProductList from "./components/products/ProductList";
import CategoriesList from "./components/categories/CategoriesList";
import FormAddProduct from "./components/products/FormAddProduct";
import FormAddCategories from "./components/categories/FormAddCategories";
import FormUpdateCat from "./components/categories/FormUpdateCat";
import FormUpdateBook from "./components/products/FormUpdateBook";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      name: "",
      nameBook: "",
      type: "",
      quantity: "",
      status: "",
      image: ""
      // addProduct:{name :'', type: '', quantity: '', status: '', image: ''}
    };
  }

  getTableCall(table, index) {
    switch (table) {
      case "categories": {
        return this.props.firebase.getCategories(index);
      }
      case "products": {
        return this.props.firebase.products(index);
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
  }

  addCategory = name => {
    this.props.firebase.getCategories().push({ name });
    this.setState({
      name: ""
    });
  };
  addBook = book => {
    const { name, type, quantity, image, status } = book;
    this.props.firebase.products().push({ name,type, quantity, image,  status });
  };
  deleteBook = index => {
    this.props.firebase.product(index).remove();
  };
  editBook = (index, data) => {
    console.log(this.props.firebase,'jdhfisdh')
    const { name, type, quantity, status,image } = data;
    console.log('data nef', data)
    this.props.firebase.product(index).set({
      image:image,
      name:name,
      type:type,
      quantity:quantity,
      status:status,
      
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

  render() {
    const { categories, products } = this.state;
    return (
      <Router>
        <Header />
        <div className="app-main">
          <LeftMenu />
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route
              path="/book"
              component={() => <ProductList products={products} deleteBook={this.deleteBook} />}
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
          </Switch>
          <Route
            path="/addProduct"
            component={() => <FormAddProduct addBook={this.addBook} />}
          />
          <Route
            path="/updateBook/:id"
            component={match => (
              <FormUpdateBook
              products={products}
                editBook={this.editBook}
                match={match}
              />
            )}
          />
          <Route
            path="/updateCat/:id"
            component={match => (
              <FormUpdateCat
                categories={categories}
                editCategories={this.editCategories}
                match={match}
              />
            )}
          />
          <Route
            path="/addCategory"
            component={() => (
              <FormAddCategories addCategory={this.addCategory} />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
