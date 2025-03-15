const navEvents = () => {
  document.querySelector('#navigation').addEventListener('click', (e) => {
    if (e.target.id.includes('#')) {
      console.warn('yooo');
    }
  });
};

export default navEvents;
