import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDOM';

const addItemForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `add-item--${obj.firebaseKey}` : 'add-item'}" class="mb-4">
      <div class="form-group">
        <label for="item-name" class="form-label">Item Name</label>
        <input 
          type="text" 
          class="form-control" 
          id="item-name" 
          placeholder="Enter item name" 
          value="${obj.name || ''}" 
          required>
      </div>
      <div class="form-group mt-3">
        <label for="item-price" class="form-label">Item Price</label>
        <input 
          type="number" 
          class="form-control" 
          id="item-price" 
          placeholder="Enter item price" 
          value="${obj.price || ''}" 
          required>
      </div>
      <button type="submit" class="btn btn-success mt-3">Add/Edit Item</button>
    </form>
  `;

  renderToDOM('#form-container', domString);
};

export default addItemForm;
