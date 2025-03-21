import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDOM';

const closeOrderForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="close-order--${obj.firebaseKey}" class="mb-4">
      <div class="form-group">
        <label for="payment-type" class="form-label">Payment Method</label>
        <select id="payment-type" class="form-select" name="payment-type" required>
          <option value="select">Select a Payment Method</option>
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>
      <div class="form-group mt-3">
        <label for="tip" class="form-label">Tip Amount</label>
        <input 
          type="number"
          step="0.01" 
          class="form-control" 
          id="tip" 
          aria-describedby="tipHelp" 
          placeholder="Enter tip amount" 
          value="${obj.tip || ''}">
        <small id="tipHelp" class="form-text text-muted">Tip in USD.</small>
      </div>
      <button type="submit" class="btn btn-success mt-3">Close Order</button>
    </form>
  `;

  renderToDOM('#form-container', domString);
};

export default closeOrderForm;
