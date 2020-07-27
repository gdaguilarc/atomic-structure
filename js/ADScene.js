class ADScene extends THREE.Scene {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      30000
    );

    this.camera.position.set(0, 0, 200);

    new THREE.OrbitControls(this.camera, canvas);
    this.scenceLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

    this.world = new World(this);
    const factory = SceneObjectFactory.getInstance();
    factory.init(this.world);
    factory.createSkyBox();

    const nuclei = factory.createNuclei(1000, 5);
    factory.createSubparticleSpawner(nuclei);
    factory.createMicroscope();

    this.add(this.scenceLight);
  }

  update(delta) {
    // Update the input
    InputManager.getInstance().update();
    this.world.update(delta);
    // Saves previous state
    InputManager.getInstance().lateUpdate();

    this.world.freeMemory();
  }

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
  }
}
