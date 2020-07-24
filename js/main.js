class Main {
  constructor(canvas) {
    this.previousTimestamp = 0;
    // RENDERER ENGINE
    this.canvas = canvas;
    this.engine = new THREE.WebGLRenderer({ canvas });
    this.engine.setSize(window.innerWidth, window.innerHeight);
    this.engine.setClearColor(new THREE.Color(0.2, 0.2, 0.35), 1);

    // SCENE
    this.scene = new ADScene(canvas);

    // This makes the calling context always equal to the instance
    this.run = this.run.bind(this);
    this.resize = this.resize.bind(this);
  }

  run(timestamp) {
    // Make animations time dependent. We reference delta time in seconds
    const delta = (timestamp - this.previousTimestamp) / 1000;

    // ACTION
    this.render(delta);
    this.previousTimestamp = timestamp;
    requestAnimationFrame(this.run);
  }

  render(delta) {
    this.engine.render(this.scene, this.scene.camera);
    this.scene.update(delta);
  }

  resize() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.engine.setSize(this.canvas.width, this.canvas.height);
    this.scene.resize();
  }
}
