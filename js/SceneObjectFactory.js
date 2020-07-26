class SceneObjectFactory {
  static instance = null;
  static getInstance() {
    if (SceneObjectFactory.instance == null) {
      SceneObjectFactory.instance = new SceneObjectFactory();
    }

    return SceneObjectFactory.instance;
  }

  constructor() {}

  // Must be called when retrieving the instance for the first time
  init(world) {
    this.world = world;
  }

  createNuclei(mass, gravity) {
    const nuclei = new SceneObject(this.world);
    const transform = new CoTransform(nuclei);
    transform.location = new THREE.Vector3(0, 0, 0);
    nuclei.components.push(transform);
    const attractor = new CoAttractor(nuclei);
    attractor.mass = mass;
    attractor.gravity = gravity;
    nuclei.components.push(attractor);
    nuclei.components.push(new CoNuclei(nuclei));
    nuclei.init();
    return nuclei;
  }

  createSkyBox() {
    const sky = new SceneObject(this.world);
    sky.components.push(new CoSkyBox(sky));
    sky.init();
    return sky;
  }

  createElectron(location, velocity, mass) {
    const electron = new SceneObject(this.world);
    const transform = new CoTransform(electron);
    transform.location = location;
    electron.components.push(transform);
    const mover = new CoMover(electron);
    mover.velocity = velocity;
    mover.acceleration = new THREE.Vector3(0, 0, 0);
    mover.mass = mass;
    electron.components.push(mover);
    electron.components.push(new CoElectron(electron));

    electron.init();
    return electron;
  }
}
