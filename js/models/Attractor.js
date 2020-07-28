class Attractor {
  constructor(mass, gravity, location) {
    this.mass = mass;
    this.gravity = gravity;
    this.location = location;
  }

  attract(mover) {
    // Gravitational attraction: F = G*M1*M2/(distance*distance)
    const force = this.location.clone();
    force.sub(mover.location);
    let distance = force.length();
    distance = clamp(distance, 8, 20);
    force.normalize();

    const strength =
      (this.gravity * this.mass * mover.mass) / (distance * distance);

    force.multiplyScalar(strength);
    return force;
  }
}
