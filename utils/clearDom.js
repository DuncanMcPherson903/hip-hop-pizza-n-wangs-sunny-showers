const clearDom = () => {
  document.querySelector('#home-screen').innerHTML = '';
  document.querySelector('#revenue-screen').innerHTML = '';
  document.querySelector('#cards').innerHTML = '';
  document.querySelector('#form-container').innerHTML = '';
};

export default clearDom;
