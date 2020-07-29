class Main {
  constructor(canvas) {
    this.previousTimestamp = 0;
    this.multiview = false;

    // RENDERER ENGINE
    this.canvas = canvas;
    this.engine = new THREE.WebGLRenderer({ canvas, antialias: false });
    this.engine.setSize(window.innerWidth, window.innerHeight);
    this.engine.setClearColor(new THREE.Color(0.2, 0.2, 0.35), 1);
    this.engine.autoClear = false;

    // SCENE
    this.scene = new ADScene(canvas, this.engine);

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
    InputManager.getInstance().update();

    if (Input.getInstance().isKeyPressed(InputKeyCode.Space)) {
      this.multiview = !this.multiview;
    }
    this.updateMultiview();

    this.scene.update(delta);
  }

  resize() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.engine.setSize(this.canvas.width, this.canvas.height);
    this.scene.resize();
  }

  updateMultiview() {
    if (!this.multiview) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.scene.camera.aspect = this.canvas.width / this.canvas.height;
      this.scene.camera.updateProjectionMatrix();
      this.engine.setViewport(0, 0, this.canvas.width, this.canvas.height);
      this.engine.setScissor(0, 0, window.innerWidth, window.innerHeight);
      this.engine.render(this.scene, this.scene.camera);
      this.engine.render(this.scene.hud, this.scene.hudCamera);
    } else {
      const w = window.innerWidth;
      const h = window.innerHeight;

      this.scene.camera.aspect = w / 2 / h;
      this.scene.camera.updateProjectionMatrix();
      this.engine.setViewport(0, 0, w / 2, h);
      this.engine.setScissor(0, 0, w / 2, h);

      this.engine.render(this.scene, this.scene.camera);

      this.scene.cameraNuclei.aspect = w / 2 / h;
      this.scene.cameraNuclei.updateProjectionMatrix();
      this.engine.setViewport(w / 2, 0, w / 2, h);
      this.engine.setScissor(w / 2, 0, w / 2, h);
      this.engine.render(this.scene, this.scene.cameraNuclei);

      this.engine.setViewport(0, 0, w, h);
      this.engine.setScissor(0, 0, window.innerWidth, window.innerHeight);
      this.engine.render(this.scene.hud, this.scene.hudCamera);
    }
  }
}
