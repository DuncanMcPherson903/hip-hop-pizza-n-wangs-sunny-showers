import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDOM';
import { getSingleItem } from '../api/itemsData';

const viewOrderDetails = (orderObj) => {
  clearDom();

  // Ensure itemId exists and is an array
  const itemId = Array.isArray(orderObj.itemId) ? orderObj.itemId : [];
  const itemPromises = itemId.map((itemKey) => getSingleItem(itemKey));

  Promise.all(itemPromises)
    .then((itemsInOrder) => {
      // Handle the case when itemsInOrder is empty
      const itemList = itemsInOrder.map((item) => `
        <li>
        ${item.name} - $${item.price}
        <span> (Quantity: ${itemId.filter((id) => id === item.firebaseKey).length})</span>
        </li>`).join('');

      const domString = `
        <div id="customerOrderDetails" class="container text-center mt-5 card">
          <div class="d-flex flex-column align-items-center">
            <h3>Name: ${orderObj.name}</h3>
            <p class='text-info'>Email: <a class='text-info' href="mailto:${orderObj.email}">${orderObj.email}</a></p>
            <p>Phone: ${orderObj.phone}</p>
            <hr>
            <h6 class="text-center">Items:</h6>
            <ul>
              ${itemList || '<li>No items found</li>'}
            </ul>
          </div>
        </div>
      `;

      // Render the order details to the DOM
      renderToDOM('#cards', domString);
    })
    .catch((error) => {
      console.error('Error fetching items:', error);

      const errorDomString = `
        <div class="alert alert-danger" role="alert">
          Failed to load order details. Please try again later.
        </div>
      `;
      renderToDOM('#cards', errorDomString);
    });
};

export default viewOrderDetails;
