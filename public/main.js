import ViewDirectorBasedOnUserAuthStatus from '../utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
import loginScreen from '../pages/login';
import domBuilder from '../components/shared/domBuilder';

const init = () => {
  ViewDirectorBasedOnUserAuthStatus();
  domBuilder();
  loginScreen();
};

init();
