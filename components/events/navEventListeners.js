import { getItems } from '../../api/itemsData';
import showItems from '../../pages/items';
import { getOrders } from '../../api/ordersData';
import displayOrders from '../../pages/orders';
import renderToDOM from '../../utils/renderToDOM';
import clearDom from '../../utils/clearDom';

const navEvents = () => {
  document.querySelector('#navigation').addEventListener('click', (e) => {
    if (e.target.id.includes('#')) {
      console.warn('yooo');
    }
    if (e.target.id.includes('all-items')) {
      getItems().then(showItems);
    }
  });

  document.querySelector('#all-orders').addEventListener('click', () => {
    getOrders().then(displayOrders);
  });

  document.querySelector('#search').addEventListener('input', (e) => {
    const searchQuery = e.target.value.trim().toLowerCase();

    getOrders().then((orders) => {
      const filteredOrders = orders.filter((order) => order.name.toLowerCase().includes(searchQuery)
        || order.email.toLowerCase().includes(searchQuery)
        || (order.phone && String(order.phone).includes(searchQuery)));

      clearDom();

      const domString = `
        <div class="container mt-4 card">
          <h5>Search Results:</h5>
          <ul>
            ${filteredOrders.map((order) => `
              <li>
                <strong>${order.name}</strong> - ${order.email} - ${order.phone}
              </li>
            `).join('') || '<li>No matching orders found</li>'}
          </ul>
        </div>
      `;
      renderToDOM('#main-content', domString);
    });
  });
};

export default navEvents;
