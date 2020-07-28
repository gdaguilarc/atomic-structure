class CoVehicle extends Component {
  static components = [];
  constructor(sceneObject) {
    super(sceneObject);

    this.coTransform = null;
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.maxSpeed = 0;
    this.maxForce = 0;
    this.r = 0;
    this.target = new THREE.Vector3(0, 0, 0);
  }

  init() {
    this.coTransform = this.sceneObject.findComponent(CoTransform.prototype);

    CoVehicle.components.push(this);
  }

  update(delta) {
    const constantAcceleration = this.acceleration.clone();
    constantAcceleration.multiplyScalar(delta);
    this.velocity.add(constantAcceleration);
    this.coTransform.location.add(this.velocity);
    this.acceleration.multiplyScalar(0);
  }

  applyBehaviors(vehicles) {
    const separateForce = this.separate(vehicles);
    const seekForce = this.seek(this.target);
    separateForce.multiplyScalar(2);
    seekForce.multiplyScalar(1);
    this.applyForce(separateForce);
    this.applyForce(seekForce);
  }

  seek(target) {
    const desired = target.clone();
    desired.sub(this.coTransform.location);
    desired.normalize();
    desired.multiplyScalar(this.maxSpeed);

    const steer = desired.clone();
    steer.sub(this.velocity);

    steer.clampLength(0, this.maxForce);
    return steer;
  }

  separate(vehicles) {
    const desiredseparation = this.r * 2;
    const sum = new THREE.Vector3(0, 0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < vehicles.length; ++i) {
      const d = this.coTransform.location.distance(other.coTransform.location);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        const diff = this.coTransform.location.clone();
        diff.sub(other.coTransform.location);
        diff.normalize();
        diff.divideScalar(d);        // Weight by distance
        sum.add(diff);
        count++;            // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      sum.divideScalar(count);
      // Our desired vector is the average scaled to maximum speed
      sum.normalize();
      sum.multiplyScalar(this.maxspeed);
      // Implement Reynolds: Steering = Desired - Velocity
      sum.sub(this.velocity);
      sum.clampLength(0, this.maxforce);
    }
    return sum;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  destroy() {
    this.removeComponentFrom(CoVehicle.components);
  }

}