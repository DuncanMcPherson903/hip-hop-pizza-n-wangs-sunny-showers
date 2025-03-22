import {
  createItem,
  getItems,
  updateItem
}
  from '../../api/itemsData';
import showItems from '../../pages/items';
import {
  getOrders,
  createOrder,
  updateOrder,
  getSingleOrder
} from '../../api/ordersData';
import displayOrders from '../../pages/orders';
import orderForm from '../forms/addOrderForm';
import { getRevenue, updateRevenue } from '../../api/revenueData';
import getTotalPriceFromOrder from '../../utils/getTotalPriceFromOrder';

const getFormData = (userId, firebaseKey = null) => ({
  firebaseKey,
  name: document.querySelector('#order-name').value,
  phone: document.querySelector('#customer-phone').value,
  email: document.querySelector('#customer-email').value,
  time: document.querySelector('#order-time').value,
  type: document.querySelector('#order-type').value,
  status: true,
  uid: userId,
});

const formEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id === 'create-orders') {
      orderForm();
    }

    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey)
        .then((obj) => {
          if (!obj) {
            console.error(`Error: No order found for firebaseKey ${firebaseKey}`);
          } else {
            orderForm(obj); // Pass valid object
          }
        })
        .catch((error) => {
          console.error('Error fetching single order:', error);
        });
    }
  });

  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.id.includes('submit-order')) {
      const payload = getFormData(user.uid);
      createOrder(payload)
        .then(() => getOrders(user.uid).then(displayOrders))
        .catch((error) => console.error('Error creating order:', error));
    }

    if (e.target.id.includes('edit-order')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = getFormData(user.uid, firebaseKey);
      updateOrder(payload)
        .then(() => getOrders(user.uid).then(displayOrders))
        .catch((error) => console.error('Error updating order:', error));
    }

    // Form event for closing an order
    if (e.target.id.includes('close-order')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then((orderObj) => {
        const payload = {
          name: orderObj.name,
          phone: orderObj.phone,
          email: orderObj.email,
          time: orderObj.time,
          type: orderObj.type,
          status: false,
          firebaseKey,
        };
        updateOrder(payload).then(() => {
          getOrders(user.uid).then(displayOrders);
        });
      });
      // Update Revenue with order info
      getSingleOrder(firebaseKey).then((orderObj) => {
        getRevenue().then((revObj) => {
          const payload = {
            call_ins: revObj.call_ins + (orderObj.type === 'call-in' ? 1 : 0),
            walk_ins: revObj.walk_ins + (orderObj.type === 'walk-in' ? 1 : 0),
            cash: revObj.cash + (document.querySelector('#payment-type').value === 'cash' ? 1 : 0),
            credit: revObj.credit + (document.querySelector('#payment-type').value === 'credit' ? 1 : 0),
            mobile: revObj.mobile + (document.querySelector('#payment-type').value === 'mobile' ? 1 : 0),
            initial_date: revObj.initial_date,
            latest_date: orderObj.time,
            tips: revObj.tips + (document.querySelector('#tip').value ? parseFloat(document.querySelector('#tip').value) : 0),
            total: revObj.total + getTotalPriceFromOrder(orderObj),
          };
          updateRevenue(payload);
        });
      });
    }

    // Form event for submitting an item
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

    // Form event for updating an item
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
};

export default formEvents;
