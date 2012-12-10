/**
 * @fileoverview The textured M.V.P. program superclass.
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

goog.provide('cidev.webgl.shader.TextureProgram');

goog.require('cidev.webgl.shader.MVPProgram');

goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {string} vs Vertex shader code filename.
 * @param {string} fs Fragment shader code filename.
 * @param {!goog.vec.Mat4.Float32} matrix Pointer to the scene's model matrix.
 * @constructor
 * @extends {cidev.webgl.shader.MVPProgram}
 */
cidev.webgl.shader.TextureProgram = function(context, vs, fs, matrix) {
  goog.base(this, context, vs, fs, matrix);

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
goog.inherits(cidev.webgl.shader.TextureProgram, cidev.webgl.shader.MVPProgram);

/**
 * Sets up the render call, binding vertex attributes, uniforms, etc.
 * @inheritDoc
 */
cidev.webgl.shader.TextureProgram.prototype.setupRender = function(
    mesh, camera, opt_texture) {
  goog.base(this, 'setupRender', mesh, camera, opt_texture);

  mesh.bindTextureUVBuffer();
  this.context.gl.vertexAttribPointer(
      this.textureUV_, 2, goog.webgl.FLOAT, false, 0, 0);
};
