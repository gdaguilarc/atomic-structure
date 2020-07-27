class Component {
  constructor(sceneObject) {
    this.sceneObject = sceneObject;
  }
  init() {}
  update(delta) {}

  destroy() {}

  removeComponentFrom(components) {
    const index = components.findIndex((value) => {
      return value == this;
    });

    if (index !== -1) {
      components.splice(index);
    }
  }
}
