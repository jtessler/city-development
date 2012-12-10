/**
 * @fileoverview A simple vertex and fragment shader.
 *
 * This class assumes the GLSL shader code includes everything specified in the
 * superclasses, plus the following:
 *
 *   attribute vec2 textureUV;
 *
 *   uniform sampler2D texture;
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.shader.Simple');

goog.require('cidev.webgl.shader.TextureProgram');

goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {!goog.vec.Mat4.Float32} matrix Pointer to the scene's model matrix.
 * @constructor
 * @extends {cidev.webgl.shader.TextureProgram}
 */
cidev.webgl.shader.Simple = function(context, matrix) {
  goog.base(this, context, 'simple.vert', 'simple.frag', matrix);
};
goog.inherits(cidev.webgl.shader.Simple, cidev.webgl.shader.TextureProgram);
