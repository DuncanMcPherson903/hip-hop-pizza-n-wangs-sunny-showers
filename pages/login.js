import loginButton from '../components/loginButton';
import renderToDOM from '../utils/renderToDOM';

const loginScreen = () => {
  const domString = `
    <div>
      <div>
      <button id="google-auth" class="btn btn-danger">Unlock the Flavor</button>
      </div>
    </div>
  `;
  renderToDOM('#login', domString);
  loginButton();
};

export default loginScreen;
