class CoOrbiter extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);

    this.coTransform = null;
    this.angle = 0;
    this.orbitSpeed = 0;
  }

  init() {
    this.coTransform = this.sceneObject.findComponent(CoTransform.prototype);
    CoOrbiter.components.push(this);
  }

  update(delta) {
    this.angle += this.orbitSpeed * delta;
  }

  destroy() {
    this.removeComponentFrom(CoOrbiter.components);
  }
}
