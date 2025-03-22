import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDOM';
import { getSingleItem } from '../api/itemsData';
import { updateOrder } from '../api/ordersData';

const viewOrderDetails = (obj) => {
  clearDom();

  // Check if there are no items in the order
  if (!obj.items || obj.items.length === 0) {
    const domString = `
      <div id="customer-order-details" class="container text-center mt-5">
        <h3>Name: ${obj.name}</h3>
        <p>Email: <a href="mailto:${obj.email}">${obj.email}</a></p>
        <p>Phone: ${obj.phone}</p>
        <hr>
        <h5 class="text-center">No items in this order yet.</h5>
      </div>
    `;
    renderToDOM('#order-details', domString);
    return; // Stop execution since there are no items
  }
  // Fetch all the items using item_id keys if there are items
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
          <td>$${item.price}</td>
          <td>${item.quantity}</td>
          <td>$${(item.price * item.quantity)}</td>
          <td><button class="btn btn-danger btn-sm" id="remove-item-from-order-btn--${item.firebaseKey}">Delete</button></td>
        </tr>
      `)
        .join('');

      // Conditionally render the payment details section based on the order status
      let paymentDetailsSection = '';
      if (obj.status === true) {
        paymentDetailsSection = `
          <h5>Total (before tip): $${totalBeforeTax.toFixed(2)}</h5>

          <!-- Tip Input -->
          <div id="tip-section">
            <label for="tip-input">Tip: </label>
            <input type="number" id="tip-input" min="0" placeholder="Enter tip amount" />
          </div>

          <!-- Payment Type Dropdown -->
          <div id="payment-type-section">
            <label for="payment-type">Payment Type: </label>
            <select id="payment-type">
              <option value="cash">Cash</option>
              <option value="mobile">Mobile</option>
              <option value="card">Card</option>
            </select>
          </div>

          <!-- Total -->
          <div id="total-section">
            <p>Total: $<span id="order-total">${totalBeforeTax.toFixed(2)}</span></p>
          </div>
          <button class="btn checkout-btn" id="checkout-btn--${obj.firebaseKey}">CHECKOUT</button>
        `;
      } else {
        paymentDetailsSection = `
          <h6>Thank you for your payment!</h6>
        `;
      }

      const domString = `
      <div id="customer-order-details" data-order-id="${obj.firebaseKey}" class="container text-center mt-5">
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

          <div id="payment-details">
            ${paymentDetailsSection}
          </div>
      </div>
    `;

      renderToDOM('#order-details', domString);

      // Variables to hold the tip and payment type changes
      let tip = 0;
      let paymentType = obj.type; // Default to current payment type in the order

      // Update the displayed total dynamically based on tip input
      document.getElementById('tip-input').addEventListener('input', (event) => {
        tip = parseFloat(event.target.value) || 0;
        const newTotal = totalBeforeTax + tip;
        document.getElementById('order-total').textContent = newTotal.toFixed(2);
      });

      // Listen for changes in payment type
      document.getElementById('payment-type').addEventListener('change', (event) => {
        paymentType = event.target.value;
      });

      // Handle the checkout button click event
      document.getElementById(`checkout-btn--${obj.firebaseKey}`).addEventListener('click', () => {
        const newTotal = totalBeforeTax + tip;

        // Create the updated order object
        const updatedOrder = {
          firebaseKey: obj.firebaseKey,
          items: obj.items,
          name: obj.name,
          phone: obj.phone,
          email: obj.email,
          type: paymentType, // Updated payment type
          total: newTotal, // Updated total with tip
          tip, // Added tip
          status: false, // Mark order as complete (or paid)
        };

        // Push the updated order to Firebase
        updateOrder(updatedOrder)
          .then(() => {
            // Once the order is updated, change the payment details section to a thank you message
            const thankYouMessage = `
              <h6>Thank you for your payment!</h6>
            `;
            document.getElementById('payment-details').innerHTML = thankYouMessage;
          })
          .catch((error) => {
            console.error('Error updating order:', error);
          });
      });
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
