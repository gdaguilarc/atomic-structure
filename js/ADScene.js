class ADScene extends THREE.Scene {

    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 1000);
    }

    resize() {
        this.camera.aspect = this.canvas.width / this.canvas.height;
        this.camera.updateProjectionMatrix();
    }

}