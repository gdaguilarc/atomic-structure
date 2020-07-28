class CoGUI extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);

    this.electronCount = 0;
    this.electronAdded = this.electronAdded.bind(this);
    this.electronRemoved = this.electronRemoved.bind(this);
  }

  init() {
    EventEmitter.getInstance().addEventListener(
      "electronAdded",
      this.electronAdded
    );
    EventEmitter.getInstance().addEventListener(
      "electronRemoved",
      this.electronRemoved
    );
    CoGUI.components.push(this);
  }

  electronAdded() {
    this.electronCount++;
  }

  electronRemoved() {
    this.electronCount--;
  }

  update(delta) {
    this.sceneObject.world.scene.hudContext.fillText(
      `Electrons: ${this.electronCount}`,
      100,
      100
    );
  }

  destroy() {
    this.removeComponentFrom(CoGUI.components);
  }
}
