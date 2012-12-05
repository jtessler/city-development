precision mediump float;

uniform samplerCube uCubeSampler;

varying vec3 viewDirection;

void main(void) {
  gl_FragColor = textureCube(uCubeSampler, viewDirection);
}

