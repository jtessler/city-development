attribute vec3 vertexPosition;

uniform mat4 modelMatrix; // The model transformation matrix.
uniform mat4 viewMatrix; // The camera's tranformation matrix.
uniform mat4 projMatrix; // The projection matrix.

uniform vec3 viewPosition; // The camera's position in world coordinates.

varying vec3 viewDirection;

void main(void) {
  vec4 vertexWorldPosition = modelMatrix * vec4(vertexPosition, 1.0);
  viewDirection = vertexWorldPosition.xyz - viewPosition;
  gl_Position = projMatrix * viewMatrix * vertexWorldPosition;
}
