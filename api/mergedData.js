import { updateOrder, getSingleOrder } from './ordersData';
import { getItemsFromOrder } from './itemsData';

// Function to add an item to an existing order
const addItemToOrder = (orderId, itemId, quantity) => new Promise((resolve, reject) => {
  // Fetch the current order by its ID
  getSingleOrder(orderId)
    .then((order) => {
      // Get the current item_ids in the order
      const updatedItemIds = [...order.item_id];
      // Add the item multiple times based on the selected quantity
      for (let i = 0; i < quantity; i++) {
        updatedItemIds.push(itemId);
      }
      // Update the order in Firebase with the new item_ids array
      updateOrder({ firebaseKey: orderId, item_id: updatedItemIds })
        .then(() => resolve()) // Resolve after updating the order
        .catch(reject); // Reject if there's an error
    })
    .catch(reject); // Reject if fetching the order fails
});

const getOrderDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleOrder(firebaseKey).then((orderObject) => {
    getItemsFromOrder(orderObject)
      .then((itemArray) => resolve({ ...orderObject, itemArray }));
  }).catch(reject);
});

export {
  getOrderDetails,
  addItemToOrder
};