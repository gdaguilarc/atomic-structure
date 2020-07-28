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

    this.loadObj("./models/obj/orionxt8/", "orionxt8").then((myObj) => {
      myObj.scale.set(40, 40, 40);
      myObj.position.set(0, 1900, 7800);

      this.sceneObject.world.scene.add(myObj);
    });
  }

  loadObj(path, fileName) {
    let progress = console.log;

    return new Promise(function (resolve, reject) {
      const mtlLoader = new THREE.MTLLoader();
      mtlLoader.setPath(path);

      mtlLoader.setMaterials(materials).load(
        fileName + ".mtl",
        function (materials) {
          materials.preload();

          const objLoader = new THREE.OBJLoader();
          objLoader.setMaterials(materials);
          objLoader.setPath(path);
          objLoader.load(fileName + ".obj", resolve, progress, reject);
        },
        progress,
        reject
      );
    });
  }
}
