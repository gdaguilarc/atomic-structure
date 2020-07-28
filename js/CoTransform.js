class CoTransform extends Component {
  constructor(sceneObject) {
    super(sceneObject);
    this.location = new THREE.Vector3(0, 0, 0);
    this.translation = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Vector3(0, 0, 0);
  }
}
