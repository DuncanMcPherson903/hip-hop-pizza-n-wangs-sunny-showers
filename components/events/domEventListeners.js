import { getOrders, getSingleOrder } from '../../api/ordersData';
import displayOrders from '../../pages/orders';
import viewOrderDetails from '../../pages/viewOrderDetails';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('view-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then(viewOrderDetails);
    }

    if (e.target.id.includes('view-orders')) {
      getOrders().then(displayOrders);
    }
  });
};

export default domEvents;
