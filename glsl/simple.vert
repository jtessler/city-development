attribute vec3 vertexPosition;
attribute vec2 textureUV;

uniform mat4 modelMatrix; // The model transformation matrix.
uniform mat4 viewMatrix; // The camera's tranformation matrix.
uniform mat4 projMatrix; // The projection matrix.

varying vec2 vTextureUV;

void main(void) {
  gl_Position =
      projMatrix * viewMatrix * modelMatrix * vec4(vertexPosition, 1.0);
  vTextureUV = textureUV;
}
