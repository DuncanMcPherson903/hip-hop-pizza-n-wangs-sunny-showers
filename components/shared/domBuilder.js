import renderToDOM from '../../utils/renderToDOM';

const domBuilder = () => {
  const domString = `
  <div id="navigation"></div>
  <div id="main-container" class="d-flex flex-column align-items-center">
    <div id="landing"></div>
    <div id="main-content"></div>
    <div id="home-screen"></div>
    <div id="form-container"></div>
    <div id="revenue-screen"></div>
    <div id="order-details"></div>
    <div id="cards"></div>
    <div id="login-screen"></div>
  </div>`;

  renderToDOM('#app', domString);
};

export default domBuilder;
