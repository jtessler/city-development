/**
 * @fileoverview The texture super class, wrapping the WebGL texture
 * implementation.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.texture.Texture');

/**
 * The superclass representing any texture, exposing binds and texture
 * activation.
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @constructor
 */
cidev.webgl.texture.Texture = function(context) {
  this.context = context;
  this.texture = context.gl.createTexture();
  this.bindTexture();
};

/**
 * The current WebGL context wrapper.
 * @type {!cidev.webgl.Context}
 * @protected
 */
cidev.webgl.texture.Texture.prototype.context;

/**
 * The actual WebGL texture object.
 * @type {!WebGLTexture}
 * @protected
 */
cidev.webgl.texture.Texture.prototype.texture;

/**
 * Calls the appropriate bind method for the texture.
 */
cidev.webgl.texture.Texture.prototype.bindTexture = goog.abstractMethod;
