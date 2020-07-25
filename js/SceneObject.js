class SceneObject {
  constructor(world) {
    this.components = [];
    this.world = world;
  }
  init() {
    this.components.forEach((component) => {
      component.init();
    });
  }
}
