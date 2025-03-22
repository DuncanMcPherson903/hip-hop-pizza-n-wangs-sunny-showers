import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDOM';

const displayRevenue = (obj) => {
  clearDom();

  const domString = `
  <div id="revenue-details" class="container text-center mt-5">
    <h1>TOTAL REVENUE: $${obj.total}</h1>
    <br>
    <p>DATE RANGE:</p>
    <p>${obj.initial_date} - </p>
    <p>${obj.latest_date}</p>
    <br>
    <p>TOTAL TIPS: $${obj.tips}</p>
    <p>TOTAL CALL-IN ORDERS: ${obj.call_ins}</p>
    <p>TOTAL WALK-IN ORDERS: ${obj.walk_ins}</p>
    <br>
    <p>PAYMENT TYPES:</p>
    <p>CASH - ${obj.cash}</p>
    <p>CREDIT - ${obj.credit}</p>
    <p>MOBILE - ${obj.mobile}</p>
  </div>
  `;

  renderToDOM('#revenue-screen', domString);
};

export default displayRevenue;
