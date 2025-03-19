import {
  createItem,
  deleteItem,
  getItems,
  updateItem
} from '../../api/itemsData';
import showItems from '../../pages/items';
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

    if (e.target.id.includes('submit-item')) {
      const payload = {
        image: document.querySelector('#item-image').value,
        name: document.querySelector('#item-name').value,
        price: document.querySelector('#item-price').value,
      };
      createItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateItem(patchPayload).then(() => {
          getItems().then(showItems);
        });
      });
    }

    if (e.target.id.includes('update-item')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        image: document.querySelector('#item-image').value,
        name: document.querySelector('#item-name').value,
        price: document.querySelector('#item-price').value,
        firebaseKey,
      };
      updateItem(payload).then(() => {
        getItems().then(showItems);
      });
    }
  });

  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('delete-item')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteItem(firebaseKey).then(() => {
          getItems().then(showItems);
        });
      }
    }
  });
};

export default formEvents;
