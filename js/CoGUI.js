class CoGUI extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);

    this.electronCount = 0;
    this.electronCountChanged = true;
    this.electronAdded = this.electronAdded.bind(this);
  }

  init() {
    EventEmitter.getInstance().addEventListener(
      "electronAdded",
      this.electronAdded
    );
  }

  electronAdded() {
    this.electronCount++;
    this.electronAdded = true;
  }

  update(delta) {
    if (this.electronCountChanged) {
      this.sceneObject.world.scene.hudContext.fillText(
        `Electrons: ${this.electronCount}`,
        50,
        50
      );
      this.electronCountChanged = false;
      this.sceneObject.world.scene.hudTexture.needsUpdate = true;
    }
  }

  destroy() {
    this.removeComponentFrom(CoGUI.components);
  }
}
