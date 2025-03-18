import { getOrders } from '../../api/ordersData';
import displayOrders from '../../pages/orders';

const navEvents = () => {
  document.querySelector('#navigation').addEventListener('click', (e) => {
    if (e.target.id.includes('#')) {
      console.warn('yooo');
    }
  });
  document.querySelector('#all-orders').addEventListener('click', () => {
    getOrders().then(displayOrders);
  });
};

export default navEvents;
