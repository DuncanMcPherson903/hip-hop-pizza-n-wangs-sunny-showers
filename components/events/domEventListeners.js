import { getSingleItem } from '../../api/itemsData';
import addItemForm from '../forms/addItemForm';

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
  });
};

export default domEvents;
