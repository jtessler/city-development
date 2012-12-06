/**
 * @fileoverview The skybox scene, wrapping the environment cube map.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.scene.SkyboxScene');

goog.require('cidev.scene.Scene');

goog.require('cidev.webgl.mesh.Cube');
goog.require('cidev.webgl.shaders');
goog.require('cidev.webgl.texture.Cubemap');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {!cidev.webgl.Camera} camera The camera used in the scene.
 * @constructor
 * @extends {cidev.scene.Scene}
 */
cidev.scene.SkyboxScene = function(context, camera) {
  goog.base(this, context);

  this.initShaders(
      cidev.webgl.shaders['skybox.vert'], cidev.webgl.shaders['skybox.frag']);

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
  this.uCameraPosition_ =
      gl.getUniformLocation(this.program, 'uCameraPosition');

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
   * @type {WebGLUniformLocation}
   * @private
   */
  this.uCubeSampler_ = gl.getUniformLocation(this.program, 'uCubeSampler');

  /**
   * @type {!cidev.webgl.Camera}
   * @private
   */
  this.camera_ = camera;

  /**
   * @type {!cidev.webgl.texture.Texture}
   * @private
   */
  this.cubemap_ = new cidev.webgl.texture.Cubemap(context);

  /**
   * @type {!cidev.webgl.mesh.Mesh}
   * @private
   */
  this.skybox_ = new cidev.webgl.mesh.Cube(context);
  goog.vec.Mat4.scale(this.skybox_.modelViewMatrix, 20, 20, 20);

};
goog.inherits(cidev.scene.SkyboxScene, cidev.scene.Scene);

/**
 * @inheritDoc
 */
cidev.scene.SkyboxScene.prototype.drawScene = function() {
  var gl = this.context.gl;
  gl.activeTexture(goog.webgl.TEXTURE0);
  gl.uniform1i(this.uCubeSampler_, 0);
  gl.uniform3fv(this.uCameraPosition_, this.camera_.pos);
  gl.uniformMatrix4fv(this.uPMatrix_, false, this.context.projectionMatrix);
  gl.uniformMatrix4fv(this.uCMatrix_, false, this.camera_.getMatrix());
  gl.uniformMatrix4fv(this.uMMatrix_, false, this.skybox_.modelViewMatrix);

  this.cubemap_.bindTexture();
  this.skybox_.bindVertexBuffer();
  gl.vertexAttribPointer(
      this.aVertexPosition_, 3, goog.webgl.FLOAT, false, 0, 0);
  this.skybox_.draw();
}
