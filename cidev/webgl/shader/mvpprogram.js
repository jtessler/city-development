/**
 * @fileoverview The model-view-projection matrix program superclass.
 *
 * This class assumes the GLSL shader code includes the following:
 *
 *   attribute vec3 vertexPosition;
 *   uniform mat4 modelMatrix; // The model transformation matrix.
 *   uniform mat4 viewMatrix; // The camera's tranformation matrix.
 *   uniform mat4 projMatrix; // The projection matrix.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.shader.MVPProgram');

goog.require('cidev.webgl.shader.Program');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {string} vs Vertex shader code filename.
 * @param {string} fs Fragment shader code filename.
 * @param {!goog.vec.Mat4.Float32} matrix Pointer to the scene's model matrix.
 * @constructor
 * @extends {cidev.webgl.shader.Program}
 */
cidev.webgl.shader.MVPProgram = function(context, vs, fs, matrix) {
  goog.base(this, context, vs, fs);

  var gl = context.gl;

  this.vertexPosition = gl.getAttribLocation(this.program, 'vertexPosition');
  gl.enableVertexAttribArray(this.vertexPosition);

  this.projMatrix = gl.getUniformLocation(this.program, 'projMatrix');
  this.viewMatrix = gl.getUniformLocation(this.program, 'viewMatrix');
  this.modelMatrix = gl.getUniformLocation(this.program, 'modelMatrix');

  /**
   * Pointer to the scene's model matrix (the caller will manipulate it before
   * rendering).
   * @type {goog.vec.Mat4.Float32}
   * @private
   */
  this.matrix_ = matrix;
};
goog.inherits(cidev.webgl.shader.MVPProgram, cidev.webgl.shader.Program);

/**
 * Sets up the render call, binding vertex attributes, uniforms, etc.
 * @inheritDoc
 */
cidev.webgl.shader.MVPProgram.prototype.setupRender = function(
    mesh, camera, opt_texture) {
  goog.base(this, 'setupRender', mesh, camera, opt_texture);

  var gl = this.context.gl;
  gl.uniformMatrix4fv(this.projMatrix, false, this.context.projMatrix);
  gl.uniformMatrix4fv(this.viewMatrix, false, camera.viewMatrix);
  gl.uniformMatrix4fv(this.modelMatrix, false, this.matrix_);

  mesh.bindVertexBuffer();
  this.context.gl.vertexAttribPointer(
      this.vertexPosition, 3, goog.webgl.FLOAT, false, 0, 0);
};

/**
 * Index of the vertex position attribute.
 * @type {number}
 * @protected
 */
cidev.webgl.shader.MVPProgram.prototype.vertexPosition;

/**
 * Location of the uniform projection matrix.
 * @type {WebGLUniformLocation}
 * @protected
 */
cidev.webgl.shader.MVPProgram.prototype.projMatrix;

/**
 * Location of the uniform view matrix.
 * @type {WebGLUniformLocation}
 * @protected
 */
cidev.webgl.shader.MVPProgram.prototype.viewMatrix;

/**
 * Location of the uniform model matrix.
 * @type {WebGLUniformLocation}
 * @protected
 */
cidev.webgl.shader.MVPProgram.prototype.modelMatrix;
