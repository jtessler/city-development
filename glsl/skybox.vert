attribute vec3 aVertexPosition;

uniform vec3 uCameraPosition;

uniform mat4 uMMatrix; // The model's model-view matrix.
uniform mat4 uCMatrix; // The camera's model-view matrix.
uniform mat4 uPMatrix; // The projection matrix.

varying vec3 viewDirection;

void main(void) {
  vec4 vertexWorldPosition = uMMatrix * vec4(aVertexPosition, 1.0);
  viewDirection = vertexWorldPosition.xyz - uCameraPosition;
  gl_Position = uPMatrix * uCMatrix * vertexWorldPosition;
}
