attribute vec3 vertexPosition;
attribute vec3 normal;
attribute vec2 textureUV;

uniform vec3 lightPosition; // The light's position in world coordinates.

uniform mat4 modelMatrix; // The model transformation matrix.
uniform mat4 viewMatrix; // The camera's tranformation matrix.
uniform mat4 projMatrix; // The projection matrix.

uniform vec3 ma; // The mesh's ambient term.
uniform vec3 md; // The mesh's diffuse term.
uniform vec3 ms; // The mesh's specular term.
uniform float shininess;

varying vec2 fragmentTextureUV;
varying vec3 color;

void main(void) {
  mat4 modelViewMatrix = viewMatrix * modelMatrix;
  vec4 vertexViewPosition = modelViewMatrix * vec4(vertexPosition, 1.0);
  vec4 lightViewPosition = viewMatrix * vec4(lightPosition, 1.0);

  vec3 L = normalize(lightViewPosition.xyz - vertexViewPosition.xyz);
  vec3 E = normalize(-vertexViewPosition.xyz);
  vec3 H = normalize(L + E);
  vec3 N = normalize(modelViewMatrix * vec4(normal, 0.0)).xyz;

  float diffuse = max(0.0, dot(L, N));
  float specular = diffuse == 0.0 ? 0.0 : pow(max(0.0, dot(N, H)), shininess);

  gl_Position = projMatrix * vertexViewPosition;
  fragmentTextureUV = textureUV;
  color = ma + md * diffuse + ms * specular;
}
