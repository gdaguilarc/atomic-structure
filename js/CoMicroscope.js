class CoMicroscope extends Component {
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

    this.loadObj("./models/obj/orionxt8/", "orionxt8");
  }

  loadObj(path, fileName) {
    new THREE.MTLLoader().load(path + fileName + ".mtl", (materials) => {
      materials.preload();
      new THREE.OBJLoader()
        .setMaterials(materials)
        .load(path + fileName + ".obj", (object) => {
          object.scale.set(50, 50, 50);
          var texture = new THREE.TextureLoader().load(path + "tex.png");

          // object.traverse((child) => {
          //   // aka setTexture
          //   console.log(child);

          //   console.log("fdsj");
          //   child.material = texture;
          // });
          object.material.map = texture;
          this.sceneObject.world.scene.add(object);
        });
    });
  }
}
