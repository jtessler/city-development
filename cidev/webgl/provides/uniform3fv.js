/**
 * @fileoverview An interface indicating that the implementing classes provides
 * a uniform, three-dimensional vector for a shader.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.provides.Uniform3fv');

/**
 * @interface
 */
cidev.webgl.provides.Uniform3fv = function() {};

/**
 * Provides the uniform, three-dimensional vector at the given location.
 * @param {WebGLUniformLocation} loc Uniform location in shader.
 */
cidev.webgl.provides.Uniform3fv.prototype.uniform3fv;

