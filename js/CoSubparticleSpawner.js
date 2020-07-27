class CoSubparticleSpawner extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
  }

  init() {
    CoSubparticleSpawner.components.push(this);
  }

  update(delta) {}

  destroy() {
    this.removeComponentFrom(CoSubparticleSpawner.components);
  }
}
