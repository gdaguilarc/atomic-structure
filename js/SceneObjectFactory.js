class SceneObjectFactory {
    static instance = null;
    static getInstance() {
        if (SceneObjectFactory.instance == null) {
            SceneObjectFactory.instance = new SceneObjectFactory();
        }

        return SceneObjectFactory.instance;
    }

    constructor() {
    }

    // Must be called when retrieving the instance for the first time
    init(world) {
        this.world = world;
    }

    createSkyBox() {
        const sky = new SceneObject(this.world);
        sky.components.push(new CoSkyBox(sky));
        sky.init();
        return sky;
    }
}
