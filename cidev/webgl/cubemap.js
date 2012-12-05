/**
 * @fileoverview Cubemap creation and rendering.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.Cubemap');

goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {Array.<string>} faces Six URLs to cube faces in proper order.
 * @constructor
 */
cidev.webgl.Cubemap = function(context, faces) {
  /** @type {!WebGLRenderingContext} */
  var gl = context.gl;

  /**
   * @type {!WebGLTexture}
   */
  this.texture = gl.createTexture();

  gl.activeTexture(goog.webgl.TEXTURE0);
  gl.bindTexture(goog.webgl.TEXTURE_CUBE_MAP, this.texture);

  // TODO(joseph): Refactor this.
  var path = 'cubemaps/escher/';
  var images = [
      'posx.png',
      'negx.png',
      'posy.png',
      'negy.png',
      'posz.png',
      'negz.png'
  ];
  for (var i = 0; i < 6; i++) {
    var image = new Image();
    image.src = path + images[i];
    image.onload = function(target, image, texture) {
      return function() {
        //gl.pixelStorei(goog.webgl.UNPACK_FLIP_Y_WEBGL, false);
        //gl.bindTexture(goog.webgl.TEXTURE_CUBE_MAP, texture);
        gl.texImage2D(
            target,
            0,
            goog.webgl.RGBA,
            goog.webgl.RGBA,
            goog.webgl.UNSIGNED_BYTE,
            image);
        //gl.bindTexture(goog.webgl.TEXTURE_CUBE_MAP, null);
      };
    }(goog.webgl.TEXTURE_CUBE_MAP_POSITIVE_X + i, image, this.texture);
  }

  gl.texParameteri(goog.webgl.TEXTURE_CUBE_MAP, goog.webgl.TEXTURE_MAG_FILTER,
                   goog.webgl.LINEAR);
  gl.texParameteri(goog.webgl.TEXTURE_CUBE_MAP, goog.webgl.TEXTURE_MIN_FILTER,
                   goog.webgl.LINEAR);
  gl.texParameteri(goog.webgl.TEXTURE_CUBE_MAP, goog.webgl.TEXTURE_WRAP_S,
                   goog.webgl.CLAMP_TO_EDGE);
  gl.texParameteri(goog.webgl.TEXTURE_CUBE_MAP, goog.webgl.TEXTURE_WRAP_T,
                   goog.webgl.CLAMP_TO_EDGE);
};
