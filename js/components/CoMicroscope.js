class CoMicroscope extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
  }

  init() {
    const cubeMaterials = [
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("img/skybox/elyvisions/sh_ft.png"),
        side: THREE.DoubleSide,
      }), // FRONT
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("img/skybox/elyvisions/sh_bk.png"),
        side: THREE.DoubleSide,
      }), // BACK
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("img/skybox/elyvisions/sh_up.png"),
        side: THREE.DoubleSide,
      }), // UP
    ];

    this.loadObj(
      "./models/obj/star-wars-vader-tie-fighter/",
      "star-wars-vader-tie-fighter"
    );

    CoMicroscope.components.push(this);
  }

  update(delta) {
    if (this.mesh) {
      this.mesh.position.set(
        this.sceneObject.world.scene.camera.position.x,
        this.sceneObject.world.scene.camera.position.y - 800,
        this.sceneObject.world.scene.camera.position.z - 2000
      );
      this.mesh.lookAt(this.sceneObject.world.scene.camera.getWorldDirection());
    }
  }

  loadObj(path, fileName) {
    new THREE.MTLLoader().load(path + fileName + ".mtl", (materials) => {
      materials.preload();
      new THREE.OBJLoader()
        .setMaterials(materials)
        .load(path + fileName + ".obj", (object) => {
          object.scale.set(200, 200, 200);
          this.sceneObject.world.scene.add(object);
          this.mesh = object;
        });
    });
  }

  destroy() {
    this.removeComponentFrom(CoMicroscope.components);
  }
}
