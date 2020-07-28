class World {
  constructor(scene) {
    this.scene = scene;
    this.sceneObjectsToDelete = [];
  }

  destroy(sceneObject) {
    this.sceneObjectsToDelete.push(sceneObject);
  }

  freeMemory() {
    for (let i = 0; i < this.sceneObjectsToDelete.length; ++i) {
      this.sceneObjectsToDelete[i].destroy();
      this.sceneObjectsToDelete[i] = null;
    }
    this.sceneObjectsToDelete = [];
  }

  update(delta) {
    CoSkyBox.components.forEach((component) => {
      component.update(delta);
    });
    CoSubparticleSpawner.components.forEach((component) => {
      component.update(delta);
    });
    CoOrbiter.components.forEach((component) => {
      component.update(delta);
    });
    CoNuclei.components.forEach((component) => {
      component.update(delta);
    });
    CoElectron.components.forEach((component) => {
      component.update(delta);
    });
    CoGUI.components.forEach((component) => {
      component.update(delta);
    });
  }
}
