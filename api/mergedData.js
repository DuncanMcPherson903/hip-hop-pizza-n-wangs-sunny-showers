import { updateOrder, getSingleOrder } from './ordersData';
import { getItemsFromOrder } from './itemsData';

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

// get order details
const getOrderDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleOrder(firebaseKey).then((orderObject) => {
    getItemsFromOrder(orderObject)
      .then((itemArray) => resolve({ ...orderObject, itemArray }));
  }).catch(reject);
});

export {
  getOrderDetails,
  addItemsToOrder
};
