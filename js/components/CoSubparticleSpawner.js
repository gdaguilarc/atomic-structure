// TODO: FIX

class CoSubparticleSpawner extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.electrons = [];
    this.vehicles = []; // Protons or neutrons
    this.vehiclesComponents = [];
    this.level = 0;

    this.colors = ["blue", "green", "purple", "yellow"];
    this.levelDirections = [
      new THREE.Vector3(1, 1, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(1, 0, 0.5),
    ];
  }

  init() {
    CoSubparticleSpawner.components.push(this);
  }

  update(delta) {
    if (
      Input.getInstance().isKeyPressed(InputKeyCode.UpArrow) ||
      Input.getInstance().isKeyPressed(InputKeyCode.W)
    ) {
      const min = 100 * (this.level + 1);
      const max = 100 * (this.level + 1) + 70;
      const distance = Math.random() * (max - min) + min;
      const electron = SceneObjectFactory.getInstance().createElectron(
        this.levelDirections[this.level].normalize(),
        distance,
        12,
        this.colors[this.level]
      );

      this.electrons.push(electron);
      EventEmitter.getInstance().emit("electronAdded");

      if (
        this.electrons.length == 2 ||
        this.electrons.length == 8 ||
        this.electrons.length == 28
      ) {
        this.level += 1;
      }
    }

    if (
      Input.getInstance().isKeyPressed(InputKeyCode.DownArrow) ||
      Input.getInstance().isKeyPressed(InputKeyCode.S)
    ) {
      const popped = this.electrons.pop();

      if (this.electrons.length == 2 || this.electrons.length == 10) {
        this.level -= 1;
      }

      if (popped) {
        EventEmitter.getInstance().emit("electronRemoved");
        this.sceneObject.world.destroy(popped);
      }
    }
    if (Input.getInstance().isKeyPressed(InputKeyCode.J)) {
      const dir = new THREE.Vector3(Math.random(), Math.random(), Math.random());
      dir.normalize();
      dir.multiplyScalar(100);
      const vehicle = SceneObjectFactory.getInstance().createProton(dir, 2, 0.2, 3);
      const vehicleComponent = vehicle.findComponent(CoVehicle.prototype);

      this.vehicles.push(vehicle);
      this.vehiclesComponents.push(vehicleComponent);
    }
    if (Input.getInstance().isKeyPressed(InputKeyCode.K)) {
      const dir = new THREE.Vector3(Math.random(), Math.random(), Math.random());
      dir.normalize();
      dir.multiplyScalar(100);
      const vehicle = SceneObjectFactory.getInstance().createNeutron(dir, 2, 0.2, 3);
      const vehicleComponent = vehicle.findComponent(CoVehicle.prototype);

      this.vehicles.push(vehicle);
      this.vehiclesComponents.push(vehicleComponent);
    }
    for (let i = 0; i < this.vehicles.length; ++i) {
      this.vehiclesComponents[i].applyBehaviors(this.vehiclesComponents);
    }
  }

  destroy() {
    this.removeComponentFrom(CoSubparticleSpawner.components);
  }
}
