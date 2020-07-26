class ADScene extends THREE.Scene {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      2000
    );
    this.camera.position.set(0, -1, 6);
    new THREE.OrbitControls(this.camera, canvas);
    this.scenceLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

    this.world = new World(this);
    const factory = SceneObjectFactory.getInstance();
    factory.init(this.world);
    factory.createSkyBox();
    const electron = factory.createElectron(
      new THREE.Vector3(7, 0, 0),
      new THREE.Vector3(0.5, 0.5, 0.5),
      2
    );
    let mover = null;
    electron.components.forEach((component) => {
      if (component instanceof CoMover) {
        mover = component;
      }
    });

    const nuclei = factory.createNuclei(15, 5);
    let attractor = null;
    nuclei.components.forEach((component) => {
      if (component instanceof CoAttractor) {
        attractor = component;
      }
    });

    attractor.movers.push(mover);

    this.add(this.scenceLight);
  }

  update(delta) {
    this.world.update(delta);
  }

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
  }
}
