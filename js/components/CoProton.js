class CoProton extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.coTransform = null;
  }

  init() {
    this.geometry = new THREE.SphereGeometry(10, 21, 21);
    this.material = new THREE.MeshBasicMaterial({ color: 'lightblue' });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.coTransform = this.sceneObject.findComponent(CoTransform.prototype);

    this.sceneObject.world.scene.add(this.mesh);
    CoProton.components.push(this);

    this.mesh.position.set(
      this.coTransform.location.x,
      this.coTransform.location.y,
      this.coTransform.location.z
    );
  }

  update(delta) {
  }

  destroy() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.sceneObject.world.scene.remove(this.mesh);

    this.removeComponentFrom(CoProton.components);
  }
}
