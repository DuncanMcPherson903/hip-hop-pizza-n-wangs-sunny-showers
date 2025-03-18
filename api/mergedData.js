import { getSingleOrder } from './ordersData';
import { getItemsFromOrder } from './itemsData';

const getOrderDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleOrder(firebaseKey).then((orderObject) => {
    getItemsFromOrder(orderObject)
      .then((itemArray) => resolve({ ...orderObject, itemArray }));
  }).catch(reject);
});

export default getOrderDetails;
