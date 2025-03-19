import renderToDOM from '../utils/renderToDOM';
import clearDom from '../utils/clearDom';

const showItems = (array) => {
  clearDom();
  document.querySelector('#cards').innerHTML = '';
  let domString = '<button id="add-item-btn" class="btn btn-success">Add Item</button>';
  array.forEach((item) => {
    domString += `
    <div class="card border-dark" style="width: 100%; margin: 10px">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <img src=${item.image} style="width: 250px;">
        <p>$${item.price}</p>
        <hr>
        <i class="btn btn-success" id="edit-item-btn--${item.firebaseKey}">EDIT</i>
        <i class="btn btn-danger" id="delete-item-btn--${item.firebaseKey}">DELETE</i>
      </div>
    </div>
    `;
  });
  renderToDOM('#cards', domString);
};

export default showItems;
