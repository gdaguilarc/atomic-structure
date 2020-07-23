// Just to abstract the functionality
// I tried having the engine as a component instead of inheriting from it, but it just makes things harder
class ADEngine {

    // TODO: Check if we should further abstract the scene into something like World
    constructor(canvas) {
        super(canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true,
        });
    }

    // Should be called before any other method
    setScene(scene) {
        this._scene = scene;
    }

    run() {
        this.runRenderLoop(() => {
            this._scene.render();
        });
    }

}