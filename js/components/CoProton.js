class CoProton extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.coTransform = null;
  }

  init() {
    this.vertexShader = `
      varying vec2 v_uv;
      void main() {
        v_uv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;

    this.fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_uv;

      //	<https://www.shadertoy.com/view/4dS3Wd>
      //	By Morgan McGuire @morgan3d, http://graphicscodex.com
      //

      float hash(float n) { return fract(sin(n) * 1e4); }
      float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

      float hash21(vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
      mat2 makem2(float theta){float c = cos(theta);float s = sin(theta);return mat2(c,-s,s,c);}

      float noise(float x) {
        float i = floor(x);
        float f = fract(x);
        float u = f * f * (3.0 - 2.0 * f);
        return mix(hash(i), hash(i + 1.0), u);
      }

      float noise(vec2 x) {
        vec2 i = floor(x);
        vec2 f = fract(x);

        // Four corners in 2D of a tile
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        // Simple 2D lerp using smoothstep envelope between the values.
        // return vec3(mix(mix(a, b, smoothstep(0.0, 1.0, f.x)),
        //			mix(c, d, smoothstep(0.0, 1.0, f.x)),
        //			smoothstep(0.0, 1.0, f.y)));

        // Same code, with the clamps in smoothstep and common subexpressions
        // optimized away.
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      vec2 gradn(vec2 p) {
        float ep = .09;
        float gradx = noise(vec2(p.x+ep,p.y))-noise(vec2(p.x-ep,p.y));
        float grady = noise(vec2(p.x,p.y+ep))-noise(vec2(p.x,p.y-ep));
        return vec2(gradx,grady);
      }

      float flow(vec2 p) {
        float z=2.;
        float rz = 0.;
        vec2 bp = p;
        float time = u_time * 0.1;
        for (float i= 1.;i < 7.;i++ )
        {
          //primary flow speed
          p += time*.6;
          
          //secondary flow speed (speed of the perceived flow)
          bp += time*1.9;
          
          //displacement field (try changing time multiplier)
          vec2 gr = gradn(i*p*.34+time*1.);
          
          //rotation of the displacement field
          gr*=makem2(time*6.-(0.05*p.x+0.03*p.y)*40.);
          
          //displace the system
          p += gr*.5;
          
          //add noise octave
          rz+= (sin(noise(p)*7.)*0.5+0.5)/z;
          
          //blend factor (blending displaced system with base system)
          //you could call this advection factor (.5 being low, .95 being high)
          p = mix(bp,p,.77);
          
          //intensity scaling
          z *= 1.4;
          //octave scaling
          p *= 2.;
          bp *= 1.9;
        }
        return rz;	
      }

      void main(void) {
        vec2 p = v_uv - 0.5;
        p.x *= u_resolution.x / u_resolution.y;
        p *= 3.;
        float rz = flow(p);
        vec3 col = vec3(0.07,0.2,0.01) / rz;
	      col = pow(col, vec3(1.4));
        gl_FragColor = vec4(col, 1.0);	
      }
    `;

    this.uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2() }
    };

    this.geometry = new THREE.SphereGeometry(10, 21, 21);
    this.material = new THREE.ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: this.uniforms,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.coTransform = this.sceneObject.findComponent(CoTransform.prototype);

    this.sceneObject.world.scene.add(this.mesh);
    CoProton.components.push(this);

    this.mesh.position.set(
      this.coTransform.location.x,
      this.coTransform.location.y,
      this.coTransform.location.z
    );
  }

  update(delta) {
    this.uniforms.u_time.value += delta;
    const width = this.sceneObject.world.scene.engine.context.drawingBufferWidth;
    const height = this.sceneObject.world.scene.engine.context.drawingBufferHeight;

    this.uniforms.u_resolution.value = new THREE.Vector2(width, height);
    this.mesh.position.set(
      this.coTransform.location.x,
      this.coTransform.location.y,
      this.coTransform.location.z
    );
  }

  destroy() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.sceneObject.world.scene.remove(this.mesh);

    this.removeComponentFrom(CoProton.components);
  }
}
