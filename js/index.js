document.addEventListener("DOMContentLoaded", () => {
  // Init the keyboard state
  ADKeyboardState.getInstance().init();

  let canvas = document.querySelector("#renderCanvas");
  let canvasHUD = document.querySelector("#canvasHUD");
  let main = new Main(canvas, canvasHUD);
  requestAnimationFrame(main.run);
  window.addEventListener("resize", main.resize);
});
