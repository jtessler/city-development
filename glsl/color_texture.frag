precision mediump float;

varying vec2 fragmentTextureUV;
varying vec3 color;

uniform sampler2D texture;

void main(void) {
  vec4 texelColor = texture2D(texture, fragmentTextureUV);
  gl_FragColor = vec4(color * texelColor.rgb, texelColor.a);
}
