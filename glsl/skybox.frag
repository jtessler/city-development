precision mediump float;

uniform samplerCube cubeMapTexture;

varying vec3 viewDirection;

void main(void) {
  gl_FragColor = textureCube(cubeMapTexture, viewDirection);
}
