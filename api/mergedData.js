import { updateOrder, getSingleOrder } from './ordersData';
import { getItemsFromOrder } from './itemsData';
import client from '../utils/client';

const endpoint = client.databaseURL;

// function to add item to order
const addItemsToOrder = async (orderId, itemId, quantity) => {
  try {
    const order = await getSingleOrder(orderId);
    const items = Array.isArray(order.items) ? [...order.items] : [];
    const itemIndex = items.findIndex((item) => item.item_id === itemId);

    if (itemIndex !== -1) {
      items[itemIndex].quantity += quantity;
    } else {
      items.push({ item_id: itemId, quantity });
    }

    await updateOrder({ firebaseKey: orderId, items });
  } catch (error) {
    console.error('Error adding item to order:', error);
    throw error; // Re-throw to ensure the calling function can handle it
  }
};

// Function to remove an item from the order
const removeItemFromOrder = (orderFirebaseKey, itemFirebaseKey) => new Promise((resolve, reject) => {
  // Fetch the specific order
  fetch(`${endpoint}/orders/${orderFirebaseKey}.json`)
    .then((response) => response.json())
    .then((orderData) => {
      if (!orderData || !orderData.items) {
        throw new Error('Order or items not found.');
      }

      // Find the item to remove from the order
      const updatedItems = orderData.items.filter((item) => item.item_id !== itemFirebaseKey);

      // If no item was found, reject with an error message
      if (updatedItems.length === orderData.items.length) {
        throw new Error('Item not found in the order.');
      }

      // Update the order in Firebase, keeping the other order details intact
      return fetch(`${endpoint}/orders/${orderFirebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: updatedItems }),
      });
    })
    .then((response) => response.json())
    .then((data) => resolve(data)) // Return the updated order data
    .catch((error) => reject(error)); // Catch errors and reject the promise
});

// get order details
const getOrderDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleOrder(firebaseKey).then((orderObject) => {
    getItemsFromOrder(orderObject)
      .then((itemArray) => resolve({ ...orderObject, itemArray }));
  }).catch(reject);
});

export {
  getOrderDetails,
  removeItemFromOrder,
  addItemsToOrder
};
