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

  findComponent(type) {
    let result = null;
    this.components.forEach((component) => {
      if (Object.getPrototypeOf(component) === type) {
        result = component;
      }
    });
    return result;
  }

  destroy() {
    for (let i = 0; i < this.components.length; ++i) {
      this.components[i].destroy();
      this.components[i] = null;
    }
    this.components = null;
  }
}
