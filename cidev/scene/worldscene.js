/**
 * @fileoverview The world scene, including all models.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.scene.WorldScene');

goog.require('cidev.scene.Scene');

goog.require('cidev.webgl.mesh.Cube');
goog.require('cidev.webgl.shaders');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {!cidev.webgl.Camera} camera The camera used in the scene.
 * @constructor
 * @extends {cidev.scene.Scene}
 */
cidev.scene.WorldScene = function(context, camera) {
  goog.base(this, context);

  this.initShaders(
      cidev.webgl.shaders['simple.vert'], cidev.webgl.shaders['white.frag']);

  var gl = context.gl;

  // TODO(joseph): Refactor all shared shader code.
  /**
   * @type {number}
   * @private
   */
  this.aVertexPosition_ = gl.getAttribLocation(this.program, 'aVertexPosition');
  gl.enableVertexAttribArray(this.aVertexPosition_);

  /**
   * @type {WebGLUniformLocation}
   * @private
   */
  this.uPMatrix_ = gl.getUniformLocation(this.program, 'uPMatrix');

  /**
   * @type {WebGLUniformLocation}
   * @private
   */
  this.uCMatrix_ = gl.getUniformLocation(this.program, 'uCMatrix');

  /**
   * @type {WebGLUniformLocation}
   * @private
   */
  this.uMMatrix_ = gl.getUniformLocation(this.program, 'uMMatrix');

  /**
   * @type {!cidev.webgl.mesh.Mesh}
   * @private
   */
  this.cube_ = new cidev.webgl.mesh.Cube(context);
  goog.vec.Mat4.translate(this.cube_.modelViewMatrix, 0, 0, 5);
  goog.vec.Mat4.rotateY(this.cube_.modelViewMatrix, Math.PI / 4);

  /**
   * @type {!cidev.webgl.Camera}
   * @private
   */
  this.camera_ = camera;
};
goog.inherits(cidev.scene.WorldScene, cidev.scene.Scene);

/**
 * @inheritDoc
 */
cidev.scene.WorldScene.prototype.drawScene = function() {
  // TODO(joseph): Refactor uniform setting.
  var gl = this.context.gl;
  gl.uniformMatrix4fv(this.uPMatrix_, false, this.context.projectionMatrix);
  gl.uniformMatrix4fv(this.uCMatrix_, false, this.camera_.getMatrix());
  gl.uniformMatrix4fv(this.uMMatrix_, false, this.cube_.modelViewMatrix);

  this.cube_.bindVertexBuffer();
  gl.vertexAttribPointer(
      this.aVertexPosition_, 3, goog.webgl.FLOAT, false, 0, 0);

  this.cube_.draw();
};
