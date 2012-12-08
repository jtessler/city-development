/**
 * @fileoverview An interface indicating that the implementing classes provides
 * a uniform integer (typically pointing to a texture unit index) for a shader.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.provides.Uniform1i');

/**
 * @interface
 */
cidev.webgl.provides.Uniform1i = function() {};

/**
 * Provides the uniform integer at the given location.
 * @param {WebGLUniformLocation} loc Uniform location in shader.
 */
cidev.webgl.provides.Uniform1i.prototype.uniform1i;


