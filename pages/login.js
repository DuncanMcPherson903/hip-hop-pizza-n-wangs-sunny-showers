import loginButton from '../components/loginButton';
import renderToDOM from '../utils/renderToDOM';

const loginScreen = () => {
  const domString = `
    <div id="login-background">
      <img src="https://images.unsplash.com/photo-1546528377-9049abbac32f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hip Hop Graffiti" id="logo">
      <div id="login-form-container"></div>
    </div>
  `;
  renderToDOM('#login-screen', domString);
  loginButton();
};

export default loginScreen;
