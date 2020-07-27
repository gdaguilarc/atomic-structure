document.addEventListener('DOMContentLoaded', () => {
  // Init the keyboard state
  ADKeyboardState.getInstance().init();

  let canvas = document.querySelector('#renderCanvas');
  let main = new Main(canvas);
  requestAnimationFrame(main.run);
  window.addEventListener('resize', main.resize);
});