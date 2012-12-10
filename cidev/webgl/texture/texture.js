/**
 * @fileoverview The texture super class, wrapping the WebGL texture
 * implementation.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.texture.Texture');

goog.require('goog.webgl');

/**
 * The superclass representing any texture, wrapping binds and the unit index.
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @param {number=} opt_unit The optional unit index, where the maximum amount
 *     of texture units is hardware dependent. Defaults to 0.
 * @constructor
 */
cidev.webgl.texture.Texture = function(context, opt_unit) {
  this.context = context;
  this.unit = goog.isDef(opt_unit) ? opt_unit : 0;

  var gl = context.gl;
  var unitSize = gl.getParameter(goog.webgl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  if (this.unit < 0 || (goog.isNumber(unitSize) && this.unit >= unitSize)) {
    throw Error('invalid unit index ' + this.unit);
  }
  this.texture = gl.createTexture();
  this.activate();
  this.bindTexture();
};

/**
 * The current WebGL context wrapper.
 * @type {!cidev.webgl.Context}
 * @protected
 */
cidev.webgl.texture.Texture.prototype.context;

/**
 * This texture's unit index on the graphics hardware.
 * @type {number}
 */
cidev.webgl.texture.Texture.prototype.unit;

/**
 * The actual WebGL texture object.
 * @type {!WebGLTexture}
 * @protected
 */
cidev.webgl.texture.Texture.prototype.texture;

/**
 * Activates the appropriate texture unit.
 * @protected
 */
cidev.webgl.texture.Texture.prototype.activate = function() {
  this.context.gl.activeTexture(goog.webgl.TEXTURE0 + this.unit);
};

/**
 * Calls the appropriate bind method for the texture.
 * @protected
 */
cidev.webgl.texture.Texture.prototype.bindTexture = goog.abstractMethod;
