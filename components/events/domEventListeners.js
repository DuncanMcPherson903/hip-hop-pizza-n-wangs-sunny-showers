import { getSingleItem, getItems, deleteItem } from '../../api/itemsData';
import { getSingleOrder } from '../../api/ordersData';
import addItemForm from '../forms/addItemForm';
import closeOrderForm from '../forms/closeOrder';
import showItems from '../../pages/items';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('#')) {
      console.warn('yooo');
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
  });
};

export default domEvents;
