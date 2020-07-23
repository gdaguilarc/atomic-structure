document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.querySelector('#renderCanvas');
    let main = new Main(canvas);
    main.run();
    window.addEventListener('resize', () => { main.resize() });
});