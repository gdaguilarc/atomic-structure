class ADScene extends THREE.Scene {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      30000
    );

    this.camera.position.set(0, 0, 300);

    new THREE.OrbitControls(this.camera, canvas);
    this.scenceLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

    this.world = new World(this);
    const factory = SceneObjectFactory.getInstance();
    factory.init(this.world);
    factory.createSkyBox();

    const nuclei = factory.createNuclei(1000, 10, 50);
    factory.createSubparticleSpawner(nuclei);
    factory.createMicroscope();

    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    const sound = new THREE.Audio(listener);
    this.loadSound("", "").then(function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.05);
      sound.play();
    });

    factory.createElectron(
      new THREE.Vector3(1, 1, 1).normalize(),
      100,
      10,
      "blue"
    );

    this.add(this.scenceLight);
  }

  update(delta) {
    // Update the input
    InputManager.getInstance().update();

    if (Input.getInstance().isKeyPressed(InputKeyCode.Digit1)) {
      const context = new AudioContext();
      context.resume();
    }

    this.world.update(delta);
    // Saves previous state
    InputManager.getInstance().lateUpdate();

    this.world.freeMemory();
  }

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
  }

  loadSound(path, filename) {
    let progress = console.log;
    return new Promise(function (resolve, reject) {
      // create a global audio source

      // load a sound and set it as the Audio object's buffer
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load("sounds/background.mp3", resolve, progress, reject);
    });
  }
}
