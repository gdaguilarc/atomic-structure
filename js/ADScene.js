class ADScene extends THREE.Scene {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      1000
    );
    this.camera.position.set(0, -1, 6);
    new THREE.OrbitControls(this.camera, canvas);
    this.scenceLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

    this.geometryW = new THREE.SphereGeometry(2, 32, 32);

    this.vShaderW = `
      varying vec2 v_uv;
      void main() {
        v_uv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;

    this.fShaderW = `
      varying vec2 v_uv;
      uniform vec2 u_mouse;
      uniform vec2 u_resolution;
      uniform vec3 u_color;
      uniform float u_time;
      void main() {
          vec2 v = u_mouse / u_resolution;
          vec2 uv = gl_FragCoord.xy / u_resolution;
          gl_FragColor = vec4(1.0 ,abs(sin(u_time)),0.0,1.0);
      }
    `;

    this.uniformsW = {
      u_resolution: { value: { x: null, y: null } },
      u_time: { value: 1.0 },
      u_mouse: { value: { x: null, y: null } },
    };

    this.shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: this.vShaderW,
      fragmentShader: this.fShaderW,
      uniforms: this.uniformsW,
    });

    this.sky = new THREE.Mesh(this.geometryW, this.shaderMaterial);

    // Stuff
    this.geometry = new THREE.SphereGeometry(1, 21, 21);
    this.material = this.shaderMaterial;
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.spherePhysicsBody = new Mover(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      20
    );

    this.moonPhysicsBody = new Mover(
      new THREE.Vector3(5, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
      1
    );

    this.moonAttractor = new Attractor(
      this.spherePhysicsBody.mass,
      0.4,
      this.spherePhysicsBody.location
    );
    this.sphereAttractor = new Attractor(
      this.spherePhysicsBody.mass,
      2,
      this.spherePhysicsBody.location
    );

    this.moonGeometry = new THREE.SphereGeometry(0.3, 21, 21);
    this.moon = new THREE.Mesh(
      this.moonGeometry,
      new THREE.MeshBasicMaterial({ color: "blue" })
    );
    this.moon.position.set(5, 0, 0);

    this.angle = 0;

    this.add(this.sky);
    this.add(this.scenceLight);
    this.add(this.sphere);
    this.add(this.moon);
  }

  update(delta) {
    // Gravity - Constant force
    // this.spherePhysicsBody.applyForce(new THREE.Vector3(0, -0.05, 0));
    //   this.moonPhysicsBody
    this.uniformsW.u_time.value += delta;
    const attractionForce = this.sphereAttractor.attract(this.moonPhysicsBody);
    this.moonPhysicsBody.applyForce(attractionForce);
    this.moonPhysicsBody.update(delta);
    this.moon.position.set(
      this.moonPhysicsBody.location.x,
      this.moonPhysicsBody.location.y,
      this.moonPhysicsBody.location.z
    );
  }

  resize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.uniformsW.worldViewProjection = this.camera.projectionMatrix;
    this.camera.updateProjectionMatrix();
  }
}
