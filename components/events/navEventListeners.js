import { getItems } from '../../api/itemsData';
import showItems from '../../pages/items';

const navEvents = () => {
  document.querySelector('#navigation').addEventListener('click', (e) => {
    if (e.target.id.includes('#')) {
      console.warn('yooo');
    }
  });

  document.querySelector('#navigation').addEventListener('click', (e) => {
    if (e.target.id.includes('all-items')) {
      getItems().then(showItems);
    }
  });
};

export default navEvents;
