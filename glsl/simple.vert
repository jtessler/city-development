attribute vec3 vertexPosition;

uniform mat4 modelMatrix; // The model transformation matrix.
uniform mat4 viewMatrix; // The camera's tranformation matrix.
uniform mat4 projMatrix; // The projection matrix.

void main(void) {
  gl_Position =
      projMatrix * viewMatrix * modelMatrix * vec4(vertexPosition, 1.0);
}
