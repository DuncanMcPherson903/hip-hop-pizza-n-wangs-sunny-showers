import firebase from 'firebase/app';
import 'firebase/auth';

const displayWelcomeMessage = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    const displayName = user.displayName || 'User';
    const welcomeElement = document.querySelector('#welcome-message');
    if (welcomeElement) {
      welcomeElement.innerHTML = `Welcome, ${displayName}!`;
    } else {
      console.error('Error: #welcome-message element not found.');
    }
  } else {
    console.error('No user is currently signed in.');
  }
};

export default displayWelcomeMessage;
