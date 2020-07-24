class Main {

    constructor(canvas) {
        // RENDERER ENGINE
        this.canvas = canvas;
        this.engine = new THREE.WebGLRenderer({ canvas });
        this.engine.setSize(window.innerWidth, window.innerHeight);
        // SCENE
        this.scene = new ADScene(canvas);

        this.run = this.run.bind(this);
        this.resize = this.resize.bind(this);
    }


    run() {
        // ACTION
        this.render();
        requestAnimationFrame(this.run);
    }

    render() {
        this.engine.render(this.scene, this.scene.camera);
    }

    resize() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.engine.setSize(this.canvas.width, this.canvas.height);
        this.scene.resize();
    }

}