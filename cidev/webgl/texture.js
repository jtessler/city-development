/**
 * @fileoverview The texture super class, wrapping the WebGL texture
 * implementation.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.Texture');

/**
 * The superclass representing any texture, exposing binds and texture
 * activation.
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @constructor
 */
cidev.webgl.Texture = function(context) {
  this.context = context;
  this.texture = context.gl.createTexture();
};

/**
 * The current WebGL context wrapper.
 * @type {!cidev.webgl.Context}
 * @protected
 */
cidev.webgl.Texture.prototype.context;

/**
 * The actual WebGL texture object.
 * @type {!WebGLTexture}
 * @protected
 */
cidev.webgl.Texture.prototype.texture;

/**
 * Activates the texture at a given unit.
 * @param {number} unit The texture unit to activate.
 */
cidev.webgl.Texture.prototype.activate = function(unit) {
  this.context.gl.activeTexture(unit);
};

/**
 * Calls the appropriate bind method for the texture.
 */
cidev.webgl.Texture.prototype.bindTexture = goog.abstractMethod;
