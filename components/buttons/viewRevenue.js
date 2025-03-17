const viewRevenueButton = () => {
  const domString = '<button id="view-revenue" class="btn btn-warning text-dark">View Revenue</button>';
  document.querySelector('#revenue-button').innerHTML = (domString);
};

export default viewRevenueButton;
