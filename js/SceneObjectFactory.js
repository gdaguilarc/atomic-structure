class SceneObjectFactory {
  static instance = null;
  static getInstance(world = null) {
    if (SceneObjectFactory.instance == null) {
      SceneObjectFactory.instance = new SceneObjectFactory(world);
    }

    return SceneObjectFactory.instance;
  }
  constructor(world) {
    this.world = world;
  }
  createSkyBox() {
    const sky = new SceneObject(this.world);
    sky.components.push(new CoSkyBox(sky));
    sky.init();
    return sky;
  }
}
