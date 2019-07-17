import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyAoRisVAR5Jr5rmO0TOXmzqacsJi6IC_RE",
    authDomain: "projectfirebase-8d17d.firebaseapp.com",
    databaseURL: "https://projectfirebase-8d17d.firebaseio.com",
    projectId: "projectfirebase-8d17d",
    storageBucket: "projectfirebase-8d17d.appspot.com",
    messagingSenderId: "319389119327",
    appId: "1:319389119327:web:af143009c4bdae18"
};

const database = {
  Categories: 'Categories',
  user: 'user'
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.database = app.database();
  }

  // Authentication
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  userTable = id => this.database.ref(`${database.user}/${id}/`);

  getCategories = () => this.database.ref(`${database.Categories}`);

  queryData = index => this.database.ref(`${database.Categories}/` + index);
}

export default Firebase;