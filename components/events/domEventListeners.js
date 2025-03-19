import { getOrders, deleteOrder, getSingleOrder } from '../../api/ordersData';
import displayOrders from '../../pages/orders';
import orderForm from '../forms/addOrderForm';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('#')) {
      console.warn('yooo');
    }
    if (e.target.id.includes('view-orders')) {
      getOrders().then(displayOrders);
    }
    if (e.target.id.includes('delete-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      deleteOrder(firebaseKey).then(getOrders).then(displayOrders);
    }

    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then((orderObj) => orderForm(orderObj));
    }
  });
};

export default domEvents;
