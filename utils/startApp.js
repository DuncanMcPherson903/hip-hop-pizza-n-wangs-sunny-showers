import domBuilder from '../components/shared/domBuilder';
import homeScreen from '../pages/home';

const startApp = () => {
  domBuilder();
  homeScreen();
};

export default startApp;
