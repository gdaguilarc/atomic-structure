class World {
  constructor(scene) {
    this.scene = scene;
  }
  update(delta) {
    CoSkyBox.components.forEach((component) => {
      component.update(delta);
    });
  }
}
