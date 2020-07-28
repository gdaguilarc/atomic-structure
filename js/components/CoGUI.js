class CoGUI extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);

    this.electronCount = 0;
    this.protonCount = 0;
    this.neutronCount = 0;
    this.electronAdded = this.electronAdded.bind(this);
    this.electronRemoved = this.electronRemoved.bind(this);
    this.protonAdded = this.protonAdded.bind(this);
    this.protonRemoved = this.protonRemoved.bind(this);
    this.neutronAdded = this.neutronAdded.bind(this);
    this.neutronRemoved = this.neutronRemoved.bind(this);
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

    EventEmitter.getInstance().addEventListener(
      "protonAdded",
      this.protonAdded
    );
    EventEmitter.getInstance().addEventListener(
      "protonRemoved",
      this.protonRemoved
    );

    EventEmitter.getInstance().addEventListener(
      "neutronAdded",
      this.neutronAdded
    );
    EventEmitter.getInstance().addEventListener(
      "neutronRemoved",
      this.neutronRemoved
    );
    CoGUI.components.push(this);
  }

  electronAdded() {
    this.electronCount++;
  }

  electronRemoved() {
    this.electronCount--;
  }

  protonAdded() {
    this.protonCount++;
  }

  protonRemoved() {
    this.protonCount--;
  }

  neutronAdded() {
    this.neutronCount++;
  }

  neutronRemoved() {
    this.neutronCount--;
  }

  update(delta) {
    this.sceneObject.world.scene.hudContext.fillText(
      `Electrons: ${this.electronCount}`,
      100,
      100
    );

    this.sceneObject.world.scene.hudContext.fillText(
      `Protons: ${this.protonCount}`,
      100,
      200
    );

    this.sceneObject.world.scene.hudContext.fillText(
      `Neutrons: ${this.neutronCount}`,
      100,
      300
    );
  }

  destroy() {
    this.removeComponentFrom(CoGUI.components);
  }
}
