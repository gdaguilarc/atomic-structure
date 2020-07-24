document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.querySelector('#renderCanvas');
    let main = new Main(canvas);
    requestAnimationFrame(main.run);
    window.addEventListener('resize', main.resize);
});