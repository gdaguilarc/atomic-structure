class ADScene extends THREE.Scene {
  constructor(canvas, engine) {
    super();
    this.engine = engine;
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      80000
    );

    this.camera.position.set(0, 2000, 8000);

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

    this.add(this.scenceLight);

    this._initHUD();
  }

  _initHUD() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.hudCanvas = document.createElement("canvas");
    this.hudCanvas.width = width;
    this.hudCanvas.height = height;

    // Get 2D context and draw something supercool.
    this.hudContext = this.hudCanvas.getContext("2d");
    this.hudContext.font = "30px Verdana";
    this.hudContext.fillStyle = "rgba(245,245,245,0.75)";

    // Create the camera and set the viewport to match the screen dimensions.
    this.hudCamera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0,
      30
    );

    // Create also a custom scene for HUD.
    this.hud = new THREE.Scene();

    // Create texture from rendered graphics.
    this.hudTexture = new THREE.Texture(this.hudCanvas);
    this.hudTexture.needsUpdate = true;

    // Create HUD material.
    const material = new THREE.MeshBasicMaterial({ map: this.hudTexture });
    material.transparent = true;

    // Create plane to render the HUD. This plane fill the whole screen.
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const plane = new THREE.Mesh(planeGeometry, material);
    this.hud.add(plane);

    SceneObjectFactory.getInstance().createGUI();
  }

  update(delta) {
    // Update the input
    InputManager.getInstance().update();

    if (Input.getInstance().isKeyPressed(InputKeyCode.P)) {
      console.log("Pressed P");
      const context = new AudioContext();
      context.resume();
    }

    this.hudContext.clearRect(
      0,
      0,
      this.hudCanvas.width,
      this.hudCanvas.height
    );

    this.world.update(delta);
    this.hudTexture.needsUpdate = true;
    // Saves previous state
    InputManager.getInstance().lateUpdate();

    this.world.freeMemory();
  }

  resize() {
    this.hudCanvas.height = window.innerHeight;
    this.hudCanvas.width = window.innerWidth;
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
