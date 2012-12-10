precision mediump float;

varying vec2 fragmentTextureUV;
varying vec4 color;

uniform sampler2D texture;

void main(void) {
  gl_FragColor = color * texture2D(texture, fragmentTextureUV);
}
