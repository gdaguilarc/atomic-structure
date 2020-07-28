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

  createNuclei(mass, gravity, diameter) {
    const nuclei = new SceneObject(this.world);

    const transform = new CoTransform(nuclei);
    transform.location = new THREE.Vector3(0, 0, 0);
    nuclei.components.push(transform);
    const attractor = new CoAttractor(nuclei);
    attractor.mass = mass;
    attractor.gravity = gravity;
    nuclei.components.push(attractor);
    nuclei.components.push(new CoNuclei(nuclei));
    nuclei.diameter = diameter * 2;
    console.log(nuclei);
    nuclei.init();
    return nuclei;
  }

  createSkyBox() {
    const sky = new SceneObject(this.world);
    sky.components.push(new CoSkyBox(sky));
    sky.init();
    return sky;
  }

  createElectron(dir, distance, orbitSpeed, color) {
    const obj = new SceneObject(this.world);

    const transform = new CoTransform(obj);
    obj.components.push(transform);
    const orbiter = new CoOrbiter(obj);
    orbiter.dir = dir;
    orbiter.distance = distance;
    orbiter.orbitSpeed = orbitSpeed;
    obj.components.push(orbiter);
    const electron = new CoElectron(obj);
    electron.color = color;
    obj.components.push(electron);

    obj.init();
    return obj;
  }

  createSubparticleSpawner(nuclei) {
    const spawner = new SceneObject(this.world);
    const component = new CoSubparticleSpawner(spawner);
    component.nuclei = nuclei;
    spawner.components.push(component);

    spawner.init();

    return spawner;
  }

  createMicroscope() {
    const microscope = new SceneObject(this.world);
    microscope.components.push(new CoMicroscope(microscope));
    microscope.init();
  }

  createGUI() {
    const obj = new SceneObject(this.world);
    obj.components.push(new CoGUI(obj));
    obj.init();
  }
}
