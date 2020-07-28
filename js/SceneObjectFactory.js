class SceneObjectFactory {
  static instance = null;
  static getInstance() {
    if (SceneObjectFactory.instance == null) {
      SceneObjectFactory.instance = new SceneObjectFactory();
    }

    return SceneObjectFactory.instance;
  }

  constructor() { }

  // Must be called when retrieving the instance for the first time
  init(world) {
    this.world = world;
  }

  createNuclei(mass, gravity, diameter) {
    const nuclei = new SceneObject(this.world);

    const transform = new CoTransform(nuclei);
    transform.location = new THREE.Vector3(0, 0, 0);
    nuclei.components.push(transform);
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

  createNeutron(location, maxSpeed, maxForce, r) {
    const obj = new SceneObject(this.world);

    const transform = new CoTransform(obj);
    transform.location = location;
    obj.components.push(transform);
    obj.components.push(new CoNeutron(obj));
    const vehicle = new CoVehicle(obj);
    vehicle.maxSpeed = maxSpeed;
    vehicle.maxForce = maxForce;
    vehicle.r = r;
    obj.components.push(vehicle);
    obj.init();
    return obj;
  }

  createProton(location, maxSpeed, maxForce, r) {
    const obj = new SceneObject(this.world);

    const transform = new CoTransform(obj);
    transform.location = location;
    obj.components.push(transform);
    obj.components.push(new CoProton(obj));
    const vehicle = new CoVehicle(obj);
    vehicle.maxSpeed = maxSpeed;
    vehicle.maxForce = maxForce;
    vehicle.r = r;
    obj.components.push(vehicle);
    obj.init();
    return obj;
  }
}
