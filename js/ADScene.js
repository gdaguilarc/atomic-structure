class ADScene extends THREE.Scene {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      2000
    );
    this.camera.position.set(0, -1, 6);
    new THREE.OrbitControls(this.camera, canvas);
    this.scenceLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

    this.world = new World(this);
    const factory = SceneObjectFactory.getInstance();
    factory.init(this.world);
    factory.createSkyBox();
    const electron = factory.createElectron(
      new THREE.Vector3(7, 0, 0),
      new THREE.Vector3(0.5, 0.5, 0.25),
      5
    );
    let mover = electron.findComponent(CoMover.prototype);

    const nuclei = factory.createNuclei(15, 5);
    let attractor = nuclei.findComponent(CoAttractor.prototype);

    attractor.movers.push(mover);

    // GUI
    guiControls = {
      lightFrontColor: "#ffffff",
      lightFrontIntensity: 0.75,
      loadFile: function () {
        document.getElementById("inputFile").click();
      },
    };
    var datGui = new dat.GUI();
    var sliderLightFrontIntensity = datGui
      .add(guiControls, "lightFrontIntensity")
      .min(0)
      .max(1)
      .step(0.1)
      .name("Front Light Intensity");
    var colorLightFront = datGui
      .addColor(guiControls, "lightFrontColor")
      .name("Front Light Color");
    datGui.add(guiControls, "loadFile").name("Load OBJ 3D Model");
    datGui.close();

    this.add(this.scenceLight);
  }

  update(delta) {
    this.world.update(delta);
  }

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
  }
}
