import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDOM';

const displayOrders = (array) => {
  clearDom();

  let domString = '<div class="row row-cols-1 row-cols-md-3 g-3">';
  array.forEach((item) => {
    domString += `
      <div class="col"> <!-- Bootstrap column for responsive grid -->
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text mb-1">Status: ${item.status ? 'Open' : 'Close'}</p>
            <p class="card-text mb-1">Phone: ${item.phone}</p>
            <p class="card-text mb-1">Email: ${item.email}</p>
            <p class="card-text mb-3">Type: ${item.type}</p>
            <div>
              <button class="btn btn-link text-primary p-0 text-decoration-none" id="view-order-btn--${item.firebaseKey}">Details</button>
              <button class="btn btn-link text-purple p-0 text-decoration-none" id="edit-order-btn--${item.firebaseKey}">Edit</button>
              <button class="btn btn-link text-danger p-0 text-decoration-none" id="delete-order-btn--${item.firebaseKey}">Delete</button>
            </div>
          </div>
        </div>
      </div>`;
  });
  domString += '</div>';

  renderToDOM('#cards', domString);
};

export default displayOrders;
