import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDOM';

const orderForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `create-edit-order--${obj.firebaseKey}` : 'submit-order'}" class="mb-4">
      <div class="form-group">
        <label for="order-name" class="form-label">Order Name</label>
        <input 
          type="text" 
          class="form-control" 
          id="order-name" 
          placeholder="Enter order name" 
          value="${obj.orderName || ''}" 
          required>
      </div>
      <div class="form-group mt-3">
        <label for="customer-phone" class="form-label">Customer Phone</label>
        <input 
          type="tel" 
          class="form-control" 
          id="customer-phone" 
          placeholder="Enter customer phone" 
          value="${obj.phone || ''}" 
          required>
      </div>
      <div class="form-group mt-3">
        <label for="customer-email" class="form-label">Customer Email</label>
        <input 
          type="email" 
          class="form-control" 
          id="customer-email" 
          placeholder="Enter customer email" 
          value="${obj.email || ''}" 
          required>
      </div>
      <div class="form-group mt-3">
        <label for="order-type" class="form-label">Order Type</label>
        <select id="order-type" class="form-select" name="order-type" required>
          <option value="select">Select Order Type</option>
          <option value="call-in" ${obj.orderType === 'call-in' ? 'selected' : ''}>Call In</option>
          <option value="walk-in" ${obj.orderType === 'walk-in' ? 'selected' : ''}>Walk In</option>
        </select>
      </div>
      <div class="form-group mt-3">
        <label for="order-time" class="form-label">Order Time</label>
        <input 
          type="time" 
          class="form-control" 
          id="order-time" 
          value="${obj.orderTime || ''}" 
          required>
      </div>
      <button type="submit" class="btn btn-success mt-3">Create/Edit Order</button>
    </form>
  `;

  renderToDOM('#form-container', domString);
};

export default orderForm;
