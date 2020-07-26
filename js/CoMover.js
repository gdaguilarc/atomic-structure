class CoMover extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);

    this.coTransform = null;
    this.velocity = null;
    this.acceleration = null;
    this.mass = null;
  }

  init() {
    this.coTransform = this.sceneObject.findComponent(CoTransform.prototype);
    CoMover.components.push(this);
  }

  update(delta) {
    const constantAcceleration = this.acceleration.clone();
    // Make it a time based acceleration
    constantAcceleration.multiplyScalar(delta);
    this.velocity.add(constantAcceleration);
    this.coTransform.location.add(this.velocity);
    this.acceleration.multiplyScalar(0);
  }

  applyForce(force) {
    const copyForce = force.clone();
    copyForce.divideScalar(this.mass);
    this.acceleration.add(copyForce);
  }
}
