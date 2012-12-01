
attribute vec3 aVertexPosition;

uniform mat4 uMMatrix;
uniform mat4 uCMatrix;
uniform mat4 uPMatrix;

void main(void) {
  gl_Position = uPMatrix * uCMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
}
