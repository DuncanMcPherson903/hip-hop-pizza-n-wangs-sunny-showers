import { getOrders } from '../../api/ordersData';
import displayOrders from '../../pages/orders';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('#')) {
      console.warn('yooo');
    }
    if (e.target.id.includes('view-orders')) {
      getOrders().then(displayOrders);
    }
  });
};

export default domEvents;
