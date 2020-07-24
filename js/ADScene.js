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
    new THREE.OrbitControls(this.camera, canvas);

    this.light = new THREE.AmbientLight();
    this.geometry = new THREE.SphereGeometry(1, 21, 21);
    this.material = new THREE.MeshLambertMaterial({ color: "red" });
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.spherePhysicsBody = new Mover(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      1
    );

    this.moonPhysicsBody = new Mover(
      new THREE.Vector3(2, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      1
    );

    // POINT LIGHT 1
    this.pointLight1 = new THREE.PointLight("white", 1);
    this.pointLightHelper = new THREE.PointLightHelper(this.pointLight1, 0.1);
    this.pointLight1.position.set(0, 3, 0);

    this.moonAttractor = new Attractor(20, 0.4, new THREE.Vector3(0, 0, 0));
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
    this.add(this.pointLight1);
    this.add(this.pointLightHelper);
  }

  update(delta) {
    // Gravity - Constant force
    // this.spherePhysicsBody.applyForce(new THREE.Vector3(0, -0.05, 0));
    //   this.moonPhysicsBody

    const attractionForce = this.moonAttractor.attract(this.moonPhysicsBody);
    this.moonPhysicsBody.applyForce(attractionForce);
    this.moonPhysicsBody.update(delta);
    this.moon.position.set(
      this.moonPhysicsBody.location.x,
      this.moonPhysicsBody.location.y,
      this.moonPhysicsBody.location.z
    );
  }

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
  }
}
