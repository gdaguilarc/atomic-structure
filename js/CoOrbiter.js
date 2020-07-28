class CoOrbiter extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);

    this.coTransform = null;
    this.orbitSpeed = 0;

    this.dir = null;
    this.distance = null;

    this.angle = 0;
  }

  init() {
    this.coTransform = this.sceneObject.findComponent(CoTransform.prototype);
    CoOrbiter.components.push(this);

    this.coTransform.translation = this.dir.clone();
    this.coTransform.translation.multiplyScalar(this.distance);
  }

  update(delta) {
    this.angle += this.orbitSpeed * delta;
    const v2 = new THREE.Vector3(1, 0, 1); // Arbitrary perpendicular vector
    const p = this.coTransform.translation.clone();
    p.cross(v2);
    p.normalize();
    this.coTransform.rotation = p;
    this.coTransform.rotationAngle = this.angle;
  }

  destroy() {
    this.removeComponentFrom(CoOrbiter.components);
  }
}
