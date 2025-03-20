import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDOM';
import { getSingleItem } from '../api/itemsData';
// import addItemToOrder from '../api/mergedData';

const viewOrderDetails = (obj) => {
  clearDom();

  // Fetch all the items using item_id keys
  const itemPromises = obj.item_id.map((itemKey) => getSingleItem(itemKey));

  Promise.all(itemPromises)
    .then((itemsInOrder) => {
      // Create a list of item names and other details
      const itemList = itemsInOrder.map((item) => `
      <li>
      ${item.name} - $${item.price}
      <span> (Quantity: ${obj.item_id.filter((id) => id === item.firebaseKey).length})</span>
      </li>`).join('');

      const domString = `
        <div id="customer-order-details" class="container text-center mt-5">
          <div class="d-flex flex-column align-items-center">
            <h3>Name: ${obj.name}</h3>
            <p>Email: <a href="mailto:${obj.email}">${obj.email}</a></p>
            <p>Phone: ${obj.phone}</p>
            <hr>
            <h6 class="text-center">Items:</h6>
            <ul>
              ${itemList}
            </ul>
          </div>
        </div>
      `;

      // Render the order details to the DOM
      renderToDOM('#cards', domString);
    })
    .catch((error) => {
      console.error('Error fetching items:', error);
    });
};

export default viewOrderDetails;
