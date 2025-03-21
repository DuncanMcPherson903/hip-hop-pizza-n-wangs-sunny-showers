import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDOM';
import { getSingleItem } from '../api/itemsData';

const viewOrderDetails = (obj) => {
  clearDom();

  // Fetch all the items using item_id keys
  const itemPromises = obj.items.map((orderItem) => getSingleItem(orderItem.item_id).then((itemDetails) => ({
    ...itemDetails,
    quantity: orderItem.quantity,
  })));

  Promise.all(itemPromises)
    .then((itemsInOrder) => {
      // Calculate the total cost before tax
      const totalBeforeTax = itemsInOrder.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const tableList = itemsInOrder.map((item) => `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>${item.quantity}</td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
          <td><button class="btn btn-danger btn-sm" id="${item.firebaseKey}">Delete</button></td>
        </tr>
      `)
        .join('');

      const domString = `
      <div id="customer-order-details" class="container text-center mt-5">
          <h3>Name: ${obj.name}</h3>
          <p>Email: <a href="mailto:${obj.email}">${obj.email}</a></p>
          <p>Phone: ${obj.phone}</p>
          <hr>
          <h5 class="text-center">Items:</h5>
          <table class="table table-striped">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                ${tableList}
              </tbody>
            </table>
            <h5>Total (before tax): $${totalBeforeTax.toFixed(2)}</h5>
            <button class="btn checkout-btn" id="checkout-btn--${obj.firebaseKey}">CHECKOUT</button>
      </div>
    `;

      renderToDOM('#order-details', domString);
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

const viewAddItems = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += `
      <div class="add-item-card card" style="width: 18rem; margin: 10px">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <img src="${item.image}" style="width: 250px;">
          <p>$${item.price}</p>
          <hr>
          <button class="btn add-item-btn" id="add-item-to-order-btn--${item.firebaseKey}">ADD TO ORDER</button>
        </div>
      </div>
    `;
  });
  renderToDOM('#cards', domString);
};

export {
  viewOrderDetails,
  viewAddItems
};
