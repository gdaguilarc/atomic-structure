class World {
  constructor(scene) {
    this.scene = scene;
  }
  update(delta) {
    CoSkyBox.components.forEach((component) => {
      component.update(delta);
    });
    CoAttractor.components.forEach((component) => {
      component.update(delta);
    });
    CoMover.components.forEach((component) => {
      component.update(delta);
    });
    CoNuclei.components.forEach((component) => {
      component.update(delta);
    });
    CoElectron.components.forEach((component) => {
      component.update(delta);
    });
  }
}
