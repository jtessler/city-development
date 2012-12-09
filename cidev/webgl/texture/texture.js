/**
 * @fileoverview The texture super class, wrapping the WebGL texture
 * implementation.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.texture.Texture');

goog.require('cidev.webgl.provides.Uniform1i');

goog.require('goog.webgl');

/**
 * The superclass representing any texture, exposing binds and texture
 * uniform providers.
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @param {number=} opt_unit The optional unit index, where the maximum amount
 *     of texture units is hardware dependent. Defaults to 0.
 * @constructor
 * @implements {cidev.webgl.provides.Uniform1i}
 */
cidev.webgl.texture.Texture = function(context, opt_unit) {
  this.context = context;
  this.unit_ = goog.isDef(opt_unit) ? opt_unit : 0;

  var gl = context.gl;
  var unitSize = gl.getParameter(goog.webgl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  if (this.unit_ < 0 || (goog.isNumber(unitSize) && this.unit_ >= unitSize)) {
    throw Error('invalid unit index ' + this.unit_);
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
 * @private
 */
cidev.webgl.texture.Texture.prototype.unit_;

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
  this.context.gl.activeTexture(goog.webgl.TEXTURE0 + this.unit_);
};

/**
 * Calls the appropriate bind method for the texture.
 * @protected
 */
cidev.webgl.texture.Texture.prototype.bindTexture = goog.abstractMethod;

/**
 * Provides the shader this texture (already bound at the unit index).
 * @inheritDoc
 */
cidev.webgl.texture.Texture.prototype.uniform1i = function(loc) {
  this.context.gl.uniform1i(loc, this.unit_);
};
