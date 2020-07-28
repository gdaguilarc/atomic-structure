class Mover {
  constructor(
    location,
    velocity = new THREE.Vector3(0, 0, 0),
    acceleration = new THREE.Vector3(0, 0, 0),
    mass
  ) {
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.mass = mass;
  }

  update(delta) {
    const constantAcceleration = this.acceleration.clone();
    constantAcceleration.multiplyScalar(delta);
    this.velocity.add(constantAcceleration);
    this.location.add(this.velocity);
    this.acceleration.multiplyScalar(0);
  }

  applyForce(force) {
    const copyForce = force.clone();
    copyForce.divideScalar(this.mass);
    this.acceleration.add(copyForce);
  }
}
