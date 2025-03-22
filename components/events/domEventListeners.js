import { getSingleItem, getItems, deleteItem } from '../../api/itemsData';
import addItemForm from '../forms/addItemForm';
import closeOrderForm from '../forms/closeOrder';
import showItems from '../../pages/items';
import { getOrders, getSingleOrder, deleteOrder } from '../../api/ordersData';
import displayOrders from '../../pages/orders';
import { viewOrderDetails, viewAddItems } from '../../pages/viewOrderDetails';
import orderForm from '../forms/addOrderForm';
import { addItemsToOrder } from '../../api/mergedData';
import { signOut } from '../../utils/auth';
import displayRevenue from '../../pages/revenue';
import { getRevenue } from '../../api/revenueData';
import { addItemsToOrder, removeItemFromOrder } from '../../api/mergedData';


let currentOrderId = null;

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('view-orders')) {
      getOrders(user.uid).then(displayOrders);
    }
    document.body.addEventListener('click', (event) => {
      if (event.target.id === 'logout-button') {
        signOut();
        document.body.classList.add('bg-image');
      }
    });

    // View Order Details
    if (e.target.id.includes('view-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      currentOrderId = firebaseKey;
      getSingleOrder(firebaseKey)
        .then((orderObj) => {
          viewOrderDetails(orderObj); // Displays the current order details
          return getItems(); // Fetches all available items for adding to the order
        })
        .then((items) => {
          viewAddItems(items); // Displays the available items
        })
        .catch((error) => {
          console.error('Error fetching order details or items:', error);
        });
    }

    // Add Item to Order on View Order Details Page
    if (e.target.id.includes('add-item-to-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      // Prompt the user for quantity
      // eslint-disable-next-line no-alert
      const quantity = parseInt(window.prompt('Enter quantity:', '1'), 10);
      if (quantity > 0) {
        addItemsToOrder(currentOrderId, firebaseKey, quantity)
          .then(() => {
            console.warn('Item added to order!');
            return getSingleOrder(currentOrderId); // Fetch the updated order details
          })
          .then((updatedOrderObj) => {
            viewOrderDetails(updatedOrderObj); // Display the updated order details
            return getItems(); // Fetch all available items for displaying
          })
          .then(viewAddItems) // Display the available items again
          .catch((error) => {
            console.error('Error adding item to order:', error);
          });
      }
    }

    // Remove Item from Order on order details page
    if (e.target.id.includes('remove-item-from-order-btn')) {
      const orderDetailsContainer = document.querySelector('#customer-order-details');
      const orderFirebaseKey = orderDetailsContainer.getAttribute('data-order-id');
      const [, itemFirebaseKey] = e.target.id.split('--');
      removeItemFromOrder(orderFirebaseKey, itemFirebaseKey)
        .then(() => getSingleOrder(orderFirebaseKey))
        .then((updatedOrderObj) => {
          viewOrderDetails(updatedOrderObj);
          return getItems();
        })
        .then(viewAddItems)
        .catch(console.error);
    }

    // View Orders
    if (e.target.id.includes('view-orders')) {
      getOrders(user.uid).then(displayOrders);
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

    // Opens Form for closing an order
    if (e.target.id.includes('close-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then((orderObj) => closeOrderForm(orderObj));
    }

    if (e.target.id.includes('delete-item')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteItem(firebaseKey).then(() => {
          getItems().then(showItems);
        });
      }
    }
    // Delete Order
    if (e.target.id.includes('delete-order-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteOrder(firebaseKey);
        getOrders(user.uid).then(displayOrders);
      }
    }

    // Edit Order
    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then((orderObj) => orderForm(orderObj));
    }

    if (e.target.id.includes('view-revenue')) {
      getRevenue().then(displayRevenue);
    }
  });
};

export default domEvents;
