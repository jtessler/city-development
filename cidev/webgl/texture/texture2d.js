/**
 * @fileoverview A generic 2D texture wrapper.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.texture.Texture2D');

goog.require('cidev.webgl.texture.Texture');

goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @param {string} url URL path to the texture image.
 * @param {number=} opt_unit The optional unit index, where the maximum amount
 *     of texture units is hardware dependent. Defaults to 0.
 * @constructor
 * @extends {cidev.webgl.texture.Texture}
 */
cidev.webgl.texture.Texture2D = function(context, url, opt_unit) {
  goog.base(this, context, opt_unit);

  var gl = context.gl;
  gl.texParameteri(goog.webgl.TEXTURE_2D, goog.webgl.TEXTURE_MAG_FILTER,
                   goog.webgl.LINEAR);
  gl.texParameteri(goog.webgl.TEXTURE_2D, goog.webgl.TEXTURE_MIN_FILTER,
                   goog.webgl.LINEAR_MIPMAP_NEAREST);

  // TODO(joseph): Refactor this to the super class and share with cubemap.
  var image = new Image();
  image.src = url;
  image.onload = goog.bind(
      function() {
          this.activate();
          this.context.gl.texImage2D(
              goog.webgl.TEXTURE_2D,
              0,
              goog.webgl.RGBA,
              goog.webgl.RGBA,
              goog.webgl.UNSIGNED_BYTE,
              image);
          this.context.gl.generateMipmap(goog.webgl.TEXTURE_2D);
      }, this);
};
goog.inherits(cidev.webgl.texture.Texture2D, cidev.webgl.texture.Texture);

/**
 * @inheritDoc
 */
cidev.webgl.texture.Texture2D.prototype.bindTexture = function() {
  this.context.gl.bindTexture(goog.webgl.TEXTURE_2D, this.texture);
};
