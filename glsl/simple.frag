precision mediump float;

varying vec2 vTextureUV;

uniform sampler2D texture;

void main(void) {
  gl_FragColor = texture2D(texture, vTextureUV);
}
