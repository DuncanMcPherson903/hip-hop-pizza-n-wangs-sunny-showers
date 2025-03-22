import firebase from 'firebase/app';
import 'firebase/auth';
import client from './client';
import startApp from './startApp';
import loginScreen from '../pages/login';
import renderToDOM from './renderToDOM';

const ViewDirectorBasedOnUserAuthStatus = () => {
  firebase.initializeApp(client);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in do something...
      document.body.classList.remove('bg-image');
      startApp(user);
    } else {
      // person is NOT logged in
      const domString = `<div id="login"></div>
    <div id="app"></div>`;
      renderToDOM('#main-ct', domString);
      loginScreen();
    }
  });
};

export default ViewDirectorBasedOnUserAuthStatus;
