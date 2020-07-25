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
    this.scenceLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

    this.world = new World(this);
    SCENE_OBJECT_FACTORY.createSkyBox(this.world);

    this.add(this.scenceLight);
  }

  update(delta) {
    this.world.update(delta);
  }

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.uniformsW.worldViewProjection = this.camera.projectionMatrix;
    this.camera.updateProjectionMatrix();
  }
}
