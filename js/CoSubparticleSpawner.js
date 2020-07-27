class CoSubparticleSpawner extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.level = 1;

    this.nuclei = null;
    this.electrons = [];
  }

  init() {
    this.nucleiAttractor = this.nuclei.findComponent(CoAttractor.prototype);
    CoSubparticleSpawner.components.push(this);
  }

  update(delta) {
    if (
      Input.getInstance().isKeyPressed(InputKeyCode.UpArrow) ||
      Input.getInstance().isKeyPressed(InputKeyCode.W)
    ) {
      const electron = SceneObjectFactory.getInstance().createElectron(
        new THREE.Vector3(50 * this.level, 50, Math.random() * 500 + 1),
        new THREE.Vector3(0, 1.5 * this.level, 0),
        1.2,
        "red"
      );
      this.electrons.push(electron);
      console.log(this.level);
      if (
        this.electrons.length == 3 ||
        this.electrons.length == 11 ||
        this.electrons.length == 30
      ) {
        this.level += 1;
      }
    }

    if (
      Input.getInstance().isKeyPressed(InputKeyCode.DownArrow) ||
      Input.getInstance().isKeyPressed(InputKeyCode.S)
    ) {
      const popped = this.electrons.pop();

      if (this.electrons.length == 2 || this.electrons.length == 10) {
        this.level -= 1;
      }

      if (popped) {
        this.sceneObject.world.destroy(popped);
      }
    }

    this.electrons.forEach((electron) => {
      const mover = electron.findComponent(CoMover.prototype);
      mover.applyForce(this.nucleiAttractor.attract(mover));
    });
  }

  destroy() {
    this.removeComponentFrom(CoSubparticleSpawner.components);
  }
}
