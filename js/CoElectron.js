class CoElectron extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.coTransform = null;

    this.geometry = new THREE.SphereGeometry(1, 21, 21);
    this.material = new THREE.MeshBasicMaterial({ color: "blue" });
    this.electron = new THREE.Mesh(this.geometry, this.material);
  }

  init() {
    this.sceneObject.components.forEach((component) => {
      if (component instanceof CoTransform) {
        this.coTransform = component;
      }
    });

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
}
