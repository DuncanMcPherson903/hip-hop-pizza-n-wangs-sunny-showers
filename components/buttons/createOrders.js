const createOrdersButton = () => {
  const domString = '<button id="create-orders" class="btn btn-info text-dark">Create Orders</button>';
  document.querySelector('#create-orders-button').innerHTML = (domString);
};

export default createOrdersButton;
