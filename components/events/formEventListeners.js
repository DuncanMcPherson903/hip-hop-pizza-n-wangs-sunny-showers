import { getOrders, createOrder, updateOrder } from '../../api/ordersData';
import displayOrders from '../../pages/orders';
import orderForm from '../forms/addOrderForm';

const formEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id === 'create-orders') {
      orderForm();
    }
  });
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.id.includes('submit-order')) {
      const payload = {
        name: document.querySelector('#order-name').value,
        phone: document.querySelector('#customer-phone').value,
        email: document.querySelector('#customer-email').value,
        time: document.querySelector('#order-time').value,
        type: document.querySelector('#order-type').value,
        status: true,
      };

      createOrder(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateOrder(patchPayload).then(() => {
          getOrders().then(displayOrders);
        });
      }).catch((error) => {
        console.error('Error creating order:', error);
      });
    }
  });
};

export default formEvents;
