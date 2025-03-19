import {
  getOrders, createOrder, updateOrder, getSingleOrder
} from '../../api/ordersData';
import displayOrders from '../../pages/orders';
import orderForm from '../forms/addOrderForm';

const getFormData = (firebaseKey = null) => ({
  firebaseKey,
  name: document.querySelector('#order-name').value,
  phone: document.querySelector('#customer-phone').value,
  email: document.querySelector('#customer-email').value,
  time: document.querySelector('#order-time').value,
  type: document.querySelector('#order-type').value,
  status: true,
});

const formEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id === 'create-orders') {
      orderForm();
    }

    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then((obj) => {
        orderForm(obj);
      }).catch((error) => {
        console.error('Error fetching order for editing:', error);
      });
    }
  });

  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.id.includes('submit-order')) {
      const payload = getFormData();
      createOrder(payload)
        .then(() => getOrders().then(displayOrders))
        .catch((error) => console.error('Error creating order:', error));
    }

    if (e.target.id.includes('edit-order')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = getFormData(firebaseKey);
      updateOrder(payload)
        .then(() => getOrders().then(displayOrders))
        .catch((error) => console.error('Error updating order:', error));
    }
  });
};

export default formEvents;
