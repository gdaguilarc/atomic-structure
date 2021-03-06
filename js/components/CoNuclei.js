class CoNuclei extends Component {
  static components = [];

  constructor(sceneObject) {
    super(sceneObject);
    this.coTransform = null;
    this.diameter = null;

    this.nucleiVertexShader = `
      varying vec3 v_n_position;

      void main() {
        // This will be passed to the fragment shader
        v_n_position = normalize(position.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`;

    this.nucleiFragmentShader = `
#define PI        3.14159265
#define HALFPI    1.57079633
#define ROOTTHREE 1.73205081

uniform float u_time;
varying vec3 v_n_position;
varying vec2 vUV;

//	<https://www.shadertoy.com/view/4dS3Wd>
//	By Morgan McGuire @morgan3d, http://graphicscodex.com
//
float hash(float n) { return fract(sin(n) * 1e4); }
float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

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

// This one has non-ideal tiling properties that I'm still tuning
float noise(vec3 x) {
	const vec3 step = vec3(110, 241, 171);

	vec3 i = floor(x);
	vec3 f = fract(x);
 
	// For performance, compute the base input to a 1D hash from the integer part of the argument and the 
	// incremental change to the 1D based on the 3D -> 1D wrapping
    float n = dot(i, step);

	vec3 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
               mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}
mat3 m3 = mat3( 0.00,  0.80,  0.60,
              -0.80,  0.36, -0.48,
              -0.60, -0.48,  0.64 );
//See: https://www.shadertoy.com/view/XdfXRj
float flow(in vec3 p, in float t)
{
	float z=2.;
	float rz = 0.;
	vec3 bp = p;
	for (float i= 1.;i < 5.;i++ )
	{
		p += u_time*.2;
		rz+= (sin(noise(p+t*0.8)*6.)*0.5+0.5) /z;
		p = mix(bp,p,0.6);
		z *= 2.;
		p *= 2.01;
        p*= m3;
	}
	return rz;	
}

void main(void) {    
    vec3 color = vec3(abs(sin(u_time) - 0.5), 0, 0.);
    float d = distance(v_n_position, (vec3(0.0,-1.0,0.0)*1.5))/3.0;
    color = mix(color, vec3(abs(sin(u_time) / 0.5), 0.0, 0.0), d);
    vec3 wp = v_n_position;
    wp.y+=u_time*0.1;
    float n = flow(wp*vec3(0.6, 3.5, 0.6)*6.0, u_time*0.05);
    float n2 = flow(wp*(vec3(1.0, 3.6, 1.0)*-6.), u_time*0.2);
    float n3 = flow(wp*(vec3(1.0, 3.6, 1.0)*-12.), u_time*0.5);
    n3= n3*n3*n3;
    n = smoothstep(0.49, 0.51, n - n2)+smoothstep(0.7, 0.8, n3);

    color = mix(color, vec3(1.), n);

    gl_FragColor = vec4(color, 1.0);	
}`;

    this.nucleiUniforms = {
      u_time: { value: 0.0 },
    };

    this.nuclei = null;
  }

  init() {
    this.nuclei = new THREE.Mesh(
      new THREE.SphereGeometry(30, 32, 32),
      new THREE.ShaderMaterial({
        vertexShader: this.nucleiVertexShader,
        fragmentShader: this.nucleiFragmentShader,
        uniforms: this.nucleiUniforms,
        side: THREE.DoubleSide,
      })
    );

    this.coTransform = this.sceneObject.findComponent(CoTransform.prototype);

    this.sceneObject.world.scene.add(this.nuclei);
    CoNuclei.components.push(this);

    this.nuclei.position.set(
      this.coTransform.location.x,
      this.coTransform.location.y,
      this.coTransform.location.z
    );
  }

  update(delta) {
    this.nucleiUniforms.u_time.value += delta;
  }

  destroy() {
    this.nuclei.geometry.dispose();
    this.nuclei.material.dispose();
    this.sceneObject.world.scene.remove(this.nuclei);
    this.removeComponentFrom(CoNuclei.components);
  }
}
