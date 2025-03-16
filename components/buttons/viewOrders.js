const viewOrdersButton = () => {
  const domString = '<button id="view-orders" class="btn btn-success">View Orders</button>';
  document.querySelector('#view-orders-button').innerHTML = (domString);
};

export default viewOrdersButton;
