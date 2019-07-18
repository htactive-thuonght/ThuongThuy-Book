import app from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAoRisVAR5Jr5rmO0TOXmzqacsJi6IC_RE",
  authDomain: "projectfirebase-8d17d.firebaseapp.com",
  databaseURL: "https://projectfirebase-8d17d.firebaseio.com",
  projectId: "projectfirebase-8d17d",
  storageBucket: "projectfirebase-8d17d.appspot.com",
  messagingSenderId: "319389119327",
  appId: "1:319389119327:web:af143009c4bdae18"
};

class firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }
  categories = (index) => this.db.ref(`categories/${index}`);
  getCategories = () => this.db.ref("categories");

  product = (index) => this.db.ref(`products/${index}`);
  queryProducts = () => this.db.ref("products");
}

export default firebase;
