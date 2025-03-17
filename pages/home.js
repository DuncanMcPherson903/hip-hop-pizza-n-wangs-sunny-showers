// import navBar from '../components/shared/navBar';
import viewOrdersButton from '../components/buttons/viewOrders';
import createOrdersButton from '../components/buttons/createOrders';
import viewRevenueButton from '../components/buttons/viewRevenue';
import displayWelcomeMessage from '../utils/greetUser';

const homeScreen = () => {
  // navBar();
  const homePage = document.querySelector('#home-screen');
  homePage.innerHTML = `
  <div id="welcome-message"></div>
  <div id="buttons-container" class="flex-container">
    <div id="view-orders-button"></div>
    <div id="create-orders-button"></div>
    <div id="revenue-button"></div>
  </div>
`;
  displayWelcomeMessage();
  viewOrdersButton();
  createOrdersButton();
  viewRevenueButton();
};

export default homeScreen;
