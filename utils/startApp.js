import logoutButton from '../components/logoutButton';
import domBuilder from '../components/shared/domBuilder';
import navBar from '../components/shared/navBar';
import homeScreen from '../pages/home';
import navEvents from '../components/events/navEventListeners';
import domEvents from '../components/events/domEventListeners';
import formEvents from '../components/events/formEventListeners';

const startApp = (user) => {
  domBuilder(user);
  navBar(user);
  logoutButton();
  homeScreen(user);
  navEvents(user);
  domEvents(user);
  formEvents(user);
};

export default startApp;
