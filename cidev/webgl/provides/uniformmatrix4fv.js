/**
 * @fileoverview An interface indicating that the implementing classes provides
 * a uniform matrix for a shader.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.provides.UniformMatrix4fv');

/**
 * @interface
 */
cidev.webgl.provides.UniformMatrix4fv = function() {};

/**
 * Provides the uniform 4x4 matrix at the given location.
 * @param {WebGLUniformLocation} loc Uniform location in shader.
 */
cidev.webgl.provides.UniformMatrix4fv.prototype.uniformMatrix4fv;
