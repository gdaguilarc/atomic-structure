class ADScene extends THREE.Scene {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      2000
    );
    this.camera.position.set(0, -1, 6);
    new THREE.OrbitControls(this.camera, canvas);
    this.scenceLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

    this.world = new World(this);
    const factory = SceneObjectFactory.getInstance();
    factory.init(this.world);
    factory.createSkyBox();

    this.earth = new THREE.Mesh(
      new THREE.SphereGeometry(5, 21, 21),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );

    this.earth.position.set(0, 0, 0);
    this.earthAttractor = new Attractor(15, 5, this.earth.position);

    this.moon = new THREE.Mesh(
      new THREE.SphereGeometry(1, 21, 21),
      new THREE.MeshBasicMaterial({ color: "blue" })
    );

    this.moon.position.set(7, 0, 0);

    this.moonBody = new Mover(
      this.moon.position,
      new THREE.Vector3(0.5, 0.5, 0.25),
      new THREE.Vector3(0, 0, 0),
      2
    );

    this.add(this.scenceLight);
    this.add(this.earth);
    this.add(this.moon);
  }

  update(delta) {
    this.world.update(delta);
    const force = this.earthAttractor.attract(this.moonBody);
    this.moonBody.applyForce(force);
    this.moonBody.update(delta);
    this.moon.position.set(
      this.moonBody.location.x,
      this.moonBody.location.y,
      this.moonBody.location.z
    );
  }

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
  }
}
