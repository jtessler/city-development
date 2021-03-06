/**
 * @fileoverview Cubemap texture subclass.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.texture.Cubemap');

goog.require('cidev.webgl.texture.Texture');

goog.require('goog.uri.utils');
goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @param {string} path URL path to a folder of 6 images named
 *     "{pos,neg}{x,y,z}.png".
 * @param {number=} opt_unit The optional unit index, where the maximum amount
 *     of texture units is hardware dependent. Defaults to 0.
 * @constructor
 * @extends {cidev.webgl.texture.Texture}
 */
cidev.webgl.texture.Cubemap = function(context, path, opt_unit) {
  goog.base(this, context, opt_unit);

  var gl = context.gl;
  gl.texParameteri(goog.webgl.TEXTURE_CUBE_MAP, goog.webgl.TEXTURE_MAG_FILTER,
                   goog.webgl.LINEAR);
  gl.texParameteri(goog.webgl.TEXTURE_CUBE_MAP, goog.webgl.TEXTURE_MIN_FILTER,
                   goog.webgl.LINEAR);
  gl.texParameteri(goog.webgl.TEXTURE_CUBE_MAP, goog.webgl.TEXTURE_WRAP_S,
                   goog.webgl.CLAMP_TO_EDGE);
  gl.texParameteri(goog.webgl.TEXTURE_CUBE_MAP, goog.webgl.TEXTURE_WRAP_T,
                   goog.webgl.CLAMP_TO_EDGE);

  for (var i = 0; i < 6; i++) {
    var image = new Image();
    image.src = goog.uri.utils.appendPath(
        path, cidev.webgl.texture.Cubemap.IMAGES[i]);
    image.onload = goog.bind(
        function(target, img) {
            this.activate();
            this.context.gl.texImage2D(
                target,
                0,
                goog.webgl.RGBA,
                goog.webgl.RGBA,
                goog.webgl.UNSIGNED_BYTE,
                img);
        }, this, goog.webgl.TEXTURE_CUBE_MAP_POSITIVE_X + i, image);
  }
};
goog.inherits(cidev.webgl.texture.Cubemap, cidev.webgl.texture.Texture);

/**
 * @inheritDoc
 */
cidev.webgl.texture.Cubemap.prototype.bindTexture = function() {
  this.context.gl.bindTexture(goog.webgl.TEXTURE_CUBE_MAP, this.texture);
};

/**
 * The filenames for each cube map face.
 * @type {Array.<string>}
 * @const
 */
cidev.webgl.texture.Cubemap.IMAGES = [
    'posx.png',
    'negx.png',
    'posy.png',
    'negy.png',
    'posz.png',
    'negz.png'
];
