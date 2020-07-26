class CoAttractor extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.mass = null;
    this.gravity = null;
    this.coTransform = null;
    this.movers = [];
  }

  init() {
    this.coTransform = this.sceneObject.findComponent(CoTransform.prototype);
    CoAttractor.components.push(this);
  }

  update(delta) {
    this.movers.forEach((mover) => {
      mover.applyForce(this.attract(mover));
    });
  }

  attract(mover) {
    // Gravitational attraction: F = G*M1*M2/(distance*distance)
    const force = this.coTransform.location.clone();
    force.sub(mover.coTransform.location);
    let distance = force.length();
    distance = clamp(distance, 8, 20);
    force.normalize();

    const strength =
      (this.gravity * this.mass * mover.mass) / (distance * distance);

    force.multiplyScalar(strength);
    return force;
  }
}
