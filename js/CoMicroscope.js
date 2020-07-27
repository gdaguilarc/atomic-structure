class CoMicroscope extends Component {
  constructor(sceneObject) {
    super(sceneObject);
  }

  init() {
    this.loadObj("./models/obj/micro/", "scope").then((myObj) => {
      myObj.traverse(function (child) {
        if (child.isMesh) {
          child.material = new THREE.MeshBasicMaterial({ wireframe: true });
        }
      });
      myObj.scale.set(2, 2, 2);
      myObj.position.z = -1000;
      this.sceneObject.world.scene.add(myObj);
    });
  }

  loadObj(path, fileName) {
    var progress = console.log;

    return new Promise(function (resolve, reject) {
      const mtlLoader = new THREE.MTLLoader();
      mtlLoader.setPath(path);

      mtlLoader.load(
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