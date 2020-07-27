class CoElectron extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.coTransform = null;
    this.color = null;
  }

  init() {
    this.geometry = new THREE.SphereGeometry(1, 21, 21);
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
    this.electron.position.set(
      this.coTransform.location.x,
      this.coTransform.location.y,
      this.coTransform.location.z
    );
  }

  destroy() {
    this.electron.geometry.dispose();
    this.electron.material.dispose();
    this.sceneObject.world.scene.remove(this.electron);

    this.removeComponentFrom(CoElectron.components);
  }
}
