class SceneObjectFactory {
  constructor() {}
  createSkyBox(world) {
    const sky = new SceneObject(world);
    sky.components.push(new CoSkyBox(sky));
    sky.init();
    return sky;
  }
}

const SCENE_OBJECT_FACTORY = new SceneObjectFactory();
