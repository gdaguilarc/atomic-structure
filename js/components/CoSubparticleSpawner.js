// TODO: FIX

class CoSubparticleSpawner extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.electrons = [];
    this.level = 0;

    this.colors = ["blue", "green", "purple", "yellow"];
    this.levelDirections = [
      new THREE.Vector3(1, 1, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(1, 0, 0.5),
    ];
  }

  init() {
    CoSubparticleSpawner.components.push(this);
  }

  update(delta) {
    if (
      Input.getInstance().isKeyPressed(InputKeyCode.UpArrow) ||
      Input.getInstance().isKeyPressed(InputKeyCode.W)
    ) {
      const min = 100 * (this.level + 1);
      const max = 100 * (this.level + 1) + 70;
      const distance = Math.random() * (max - min) + min;
      const electron = SceneObjectFactory.getInstance().createElectron(
        this.levelDirections[this.level].normalize(),
        distance,
        12,
        this.colors[this.level]
      );

      this.electrons.push(electron);
      EventEmitter.getInstance().emit("electronAdded");

      if (
        this.electrons.length == 2 ||
        this.electrons.length == 8 ||
        this.electrons.length == 28
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
        EventEmitter.getInstance().emit("electronRemoved");
        this.sceneObject.world.destroy(popped);
      }
    }
  }

  destroy() {
    this.removeComponentFrom(CoSubparticleSpawner.components);
  }
}
