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

goog.require('cidev.webgl.shader.MVPProgram');
goog.require('cidev.webgl.shader.glsl');

goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @constructor
 * @extends {cidev.webgl.shader.MVPProgram}
 */
cidev.webgl.shader.Simple = function(context) {
  goog.base(this,
      context,
      cidev.webgl.shader.glsl['simple.vert'],
      cidev.webgl.shader.glsl['simple.frag']);

  var gl = context.gl;

  /**
   * Index of the vertex texture UV attribute.
   * @type {number}
   * @private
   */
  this.textureUV_ = gl.getAttribLocation(this.program, 'textureUV');
  gl.enableVertexAttribArray(this.textureUV_);

  this.texture = gl.getUniformLocation(this.program, 'texture');
};
goog.inherits(cidev.webgl.shader.Simple, cidev.webgl.shader.MVPProgram);

/**
 * Renders the given object with the given camera.
 * @inheritDoc
 */
cidev.webgl.shader.Simple.prototype.render = function(
    mesh, camera, opt_texture) {
  goog.base(this, 'render', mesh, camera, opt_texture);

  mesh.bindVertexBuffer();
  this.context.gl.vertexAttribPointer(
      this.vertexPosition, 3, goog.webgl.FLOAT, false, 0, 0);

  mesh.bindTextureUVBuffer();
  this.context.gl.vertexAttribPointer(
      this.textureUV_, 2, goog.webgl.FLOAT, false, 0, 0);
  mesh.draw();
};
