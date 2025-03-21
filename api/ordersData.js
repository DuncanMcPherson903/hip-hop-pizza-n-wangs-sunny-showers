import client from '../utils/client';

const endpoint = client.databaseURL;

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
const deleteOrder = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleOrder = (firebaseKey) => new Promise((resolve, reject) => {
  if (!firebaseKey) {
    reject(new Error('Invalid firebaseKey: firebaseKey is required.'));
    return;
  }

  fetch(`${endpoint}/orders/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) resolve(data);
      else reject(new Error(`Order not found for firebaseKey: ${firebaseKey}`));
    })
    .catch(reject);
});

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      // Add the generated firebaseKey to the order
      const firebaseKey = data.name; // 'name' contains the generated key
      const patchPayload = { ...payload, firebaseKey };

      // Update the order with its firebaseKey
      fetch(`${endpoint}/orders/${firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchPayload),
      })
        .then(() => resolve(patchPayload)) // Resolve with the updated payload
        .catch(reject);
    })
    .catch(reject);
});

const updateOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getOrders,
  deleteOrder,
  getSingleOrder,
  createOrder,
  updateOrder
};
