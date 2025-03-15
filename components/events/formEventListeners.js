const navEvents = () => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.id.includes('#')) {
      console.warn('yooo');
    }
  });
};

export default navEvents;
