attribute vec3 aVertexPosition;

uniform mat4 uMMatrix; // The model's model-view matrix.
uniform mat4 uCMatrix; // The camera's model-view matrix.
uniform mat4 uPMatrix; // The projection matrix.

void main(void) {
  gl_Position = uPMatrix * uCMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
}
