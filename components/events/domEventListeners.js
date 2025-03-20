import { getOrders, getSingleOrder, deleteOrder } from '../../api/ordersData';
import displayOrders from '../../pages/orders';
import viewOrderDetails from '../../pages/viewOrderDetails';
import orderForm from '../forms/addOrderForm';
import { getSingleItem } from '../../api/itemsData';
import addItemForm from '../forms/addItemForm';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // View Order Details
    if (e.target.id.includes('view-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then(viewOrderDetails);
    }

    // View Orders
    if (e.target.id.includes('view-orders')) {
      getOrders().then(displayOrders);
    }

    // Edit Item
    if (e.target.id.includes('edit-item-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleItem(firebaseKey).then((itemObj) => addItemForm(itemObj));
    }

    // Add Item
    if (e.target.id.includes('add-item-btn')) {
      addItemForm();
    }

    // Delete Order
    if (e.target.id.includes('delete-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      deleteOrder(firebaseKey).then(getOrders).then(displayOrders);
    }

    // Edit Order
    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then((orderObj) => orderForm(orderObj));
    }
  });
};

export default domEvents;
