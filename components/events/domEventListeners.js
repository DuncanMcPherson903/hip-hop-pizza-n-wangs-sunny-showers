const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('#')) {
      console.warn('yooo');
    }
  });
};

export default domEvents;
