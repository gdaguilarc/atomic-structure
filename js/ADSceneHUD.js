class ADSceneHUD extends THREE.Scene {
  constructor(canvas) {
    super();

    this.canvas = canvas;
    this.camera = new THREE.OrthographicCamera(
      -canvas.width / 2,
      canvas.width / 2,
      canvas.height / 2,
      -canvas.height / 2,
      0,
      30
    );

    this.context = canvas.getContext("2d");
    this.context.font = "Normal 40px Arial";
    this.context.textAlign = "center";
    this.context.fillStyle = "rgba(245,245,245,0.75)";
    this.context.fillText(
      "Initializing...",
      canvas.width / 2,
      canvas.height / 2
    );

    // PLANE TO RENDER THE HUD
    this.texture = new THREE.Texture(canvasHUD);
    this.texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
      map: this.texture,
    });

    material.transparent = true;

    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(canvas.width, canvas.height),
      material
    );

    this.add(this.plane);
  }

  update(delta) {}

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
  }
}
