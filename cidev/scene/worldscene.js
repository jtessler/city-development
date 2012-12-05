/**
 * @fileoverview The world scene, including all models.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.scene.WorldScene');

goog.require('cidev.scene.Scene');

goog.require('cidev.webgl.CubeMesh');
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

  // TODO(joseph): Find it if this is needed.
  //gl.bindAttribLocation(this.program, 0, 'aVertexPosition');

  /*
  // TODO(joseph): Refactor this.
  //this.cubemapSampler_ = gl.getUniformLocation(this.program, 'uCubeSampler');
  this.cubemap_ = new cidev.webgl.Cubemap(context, []);
  gl.activeTexture(goog.webgl.TEXTURE0);
  gl.bindTexture(goog.webgl.TEXTURE_CUBE_MAP, this.cubemap_.texture)
  //gl.uniformli(this.cubemapSampler_, 0);
  */

  var gl = context.gl;

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
   * @type {!cidev.webgl.Mesh}
   * @private
   */
  this.cube_ = new cidev.webgl.CubeMesh(context);
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
  var gl = this.context.gl;

  gl.uniformMatrix4fv(this.uPMatrix_, false, this.context.projectionMatrix);
  gl.uniformMatrix4fv(this.uCMatrix_, false, this.camera_.getMatrix());
  gl.uniformMatrix4fv(this.uMMatrix_, false, this.cube_.modelViewMatrix);

  this.cube_.bindVertexBuffer();
  gl.vertexAttribPointer(
      this.aVertexPosition_, 3, goog.webgl.FLOAT, false, 0, 0);

  this.cube_.draw();
};
