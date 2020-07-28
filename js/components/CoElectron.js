class CoElectron extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.coTransform = null;
    this.color = null;
  }

  init() {
    this.geometry = new THREE.SphereGeometry(5, 21, 21);
    this.material = new THREE.MeshBasicMaterial({ color: this.color });
    this.electron = new THREE.Mesh(this.geometry, this.material);
    this.coTransform = this.sceneObject.findComponent(CoTransform.prototype);

    this.sceneObject.world.scene.add(this.electron);
    CoElectron.components.push(this);

    this.electron.position.set(
      this.coTransform.location.x,
      this.coTransform.location.y,
      this.coTransform.location.z
    );
  }

  update(delta) {
    const r1 = new THREE.Matrix4();
    r1.makeRotationAxis(
      this.coTransform.rotation,
      this.coTransform.rotationAngle
    );

    const t1 = new THREE.Matrix4();
    t1.makeTranslation(
      this.coTransform.translation.x,
      this.coTransform.translation.y,
      this.coTransform.translation.z
    );

    const transformation = new THREE.Matrix4();
    transformation.multiplyMatrices(r1, t1);

    this.electron.matrix.copy(transformation);

    this.electron.matrixAutoUpdate = false;
    this.electron.updateMatrixWorld(true);
  }

  destroy() {
    this.electron.geometry.dispose();
    this.electron.material.dispose();
    this.sceneObject.world.scene.remove(this.electron);

    this.removeComponentFrom(CoElectron.components);
  }
}
