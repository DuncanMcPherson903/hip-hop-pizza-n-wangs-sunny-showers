import { getOrders, deleteOrder, getSingleOrder } from '../../api/ordersData';
import displayOrders from '../../pages/orders';
import orderForm from '../forms/addOrderForm';
import { getSingleItem } from '../../api/itemsData';
import addItemForm from '../forms/addItemForm';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('view-orders')) {
      getOrders().then(displayOrders);
    }

    // Opens Form for editing items
    if (e.target.id.includes('edit-item-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleItem(firebaseKey).then((itemObj) => addItemForm(itemObj));
    }

    // Opens Form for adding items
    if (e.target.id.includes('add-item-btn')) {
      addItemForm();
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
