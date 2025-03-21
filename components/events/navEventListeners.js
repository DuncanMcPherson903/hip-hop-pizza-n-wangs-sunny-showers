import { getItems } from '../../api/itemsData';
import showItems from '../../pages/items';
import { getOrders } from '../../api/ordersData';
import displayOrders from '../../pages/orders';

const navEvents = () => {
  document.querySelector('#navigation').addEventListener('click', (e) => {
    // Get all Items from nav
    if (e.target.id.includes('all-items')) {
      getItems().then(showItems);
    }
  });
  // Get all orders from nav
  document.querySelector('#all-orders').addEventListener('click', () => {
    getOrders().then(displayOrders);
  });
};

export default navEvents;
