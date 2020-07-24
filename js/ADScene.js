class ADScene extends THREE.Scene {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      1000
    );
    this.camera.position.set(0, -1, 6);

    this.light = new THREE.AmbientLight();
    this.geometry = new THREE.SphereGeometry(1, 21, 21);
    this.material = new THREE.MeshBasicMaterial({ color: "red" });
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.spherePhysicsBody = new Mover(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      1
    );

    this.moonGeometry = new THREE.SphereGeometry(0.3, 21, 21);
    this.moon = new THREE.Mesh(
      this.moonGeometry,
      new THREE.MeshBasicMaterial({ color: "blue" })
    );
    this.moon.position.set(2, 0, 0);

    this.angle = 0;
    this.add(this.sphere);
    this.add(this.light);
    this.add(this.moon);
  }

  update(delta) {
    // Gravity - Constant force
    this.spherePhysicsBody.applyForce(new THREE.Vector3(0, -0.05, 0));
    this.spherePhysicsBody.update(delta);
    this.sphere.position.set(
      this.spherePhysicsBody.location.x,
      this.spherePhysicsBody.location.y,
      this.spherePhysicsBody.location.z
    );
  }

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
  }
}
