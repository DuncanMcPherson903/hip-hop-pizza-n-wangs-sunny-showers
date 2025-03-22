import { signIn } from '../utils/auth';

// GOOGLE LOGIN BUTTON
const loginButton = () => {
  document.querySelector('#google-auth').addEventListener('click', signIn);
};

export default loginButton;
