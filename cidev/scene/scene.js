/**
 * @fileoverview The scene, including shader setup and drawing.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.scene.Scene');

goog.require('cidev.webgl.Camera');
goog.require('cidev.webgl.CubeMesh');
goog.require('cidev.webgl.Cubemap');
goog.require('cidev.webgl.shaders');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {!cidev.webgl.Camera} camera The camera used in the scene.
 * @constructor
 */
cidev.scene.Scene = function(context, camera) {
  /** @type {!cidev.webgl.Context} */
  this.context = context;

  var gl = context.gl;

  var vertexShader = context.createShader(
      cidev.webgl.shaders['simple.vert'], goog.webgl.VERTEX_SHADER);
  var fragmentShader = context.createShader(
      cidev.webgl.shaders['white.frag'], goog.webgl.FRAGMENT_SHADER);

  /**
   * @type {!WebGLProgram}
   * @private
   */
  this.program_ = gl.createProgram();

  gl.attachShader(this.program_, vertexShader);
  gl.attachShader(this.program_, fragmentShader);
  gl.bindAttribLocation(this.program_, 0, 'aVertexPosition');
  gl.linkProgram(this.program_);

  if (!gl.getProgramParameter(this.program_, goog.webgl.LINK_STATUS)) {
    throw Error('shader program error: ' + gl.getProgramInfoLog(this.program_));
  }

  /*
  // TODO(joseph): Refactor this.
  //this.cubemapSampler_ = gl.getUniformLocation(this.program_, 'uCubeSampler');
  this.cubemap_ = new cidev.webgl.Cubemap(context, []);
  gl.activeTexture(goog.webgl.TEXTURE0);
  gl.bindTexture(goog.webgl.TEXTURE_CUBE_MAP, this.cubemap_.texture)
  //gl.uniformli(this.cubemapSampler_, 0);
  */

  /**
   * @type {number}
   * @private
   */
  this.aVertexPosition_ = gl.getAttribLocation(
      this.program_, 'aVertexPosition');
  gl.enableVertexAttribArray(this.aVertexPosition_);

  /**
   * @type {WebGLUniformLocation}
   * @private
   */
  this.uPMatrix_ = gl.getUniformLocation(this.program_, 'uPMatrix');

  /**
   * @type {WebGLUniformLocation}
   * @private
   */
  this.uCMatrix_ = gl.getUniformLocation(this.program_, 'uCMatrix');

  /**
   * @type {WebGLUniformLocation}
   * @private
   */
  this.uMMatrix_ = gl.getUniformLocation(this.program_, 'uMMatrix');

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

/**
 * Draws the scene.
 */
cidev.scene.Scene.prototype.draw = function() {
  var gl = this.context.gl;

  gl.useProgram(this.program_);

  gl.clear(goog.webgl.COLOR_BUFFER_BIT | goog.webgl.DEPTH_BUFFER_BIT);

  gl.uniformMatrix4fv(this.uPMatrix_, false, this.context.projectionMatrix);
  gl.uniformMatrix4fv(this.uCMatrix_, false, this.camera_.getMatrix());
  gl.uniformMatrix4fv(this.uMMatrix_, false, this.cube_.modelViewMatrix);

  this.cube_.bindVertexBuffer();
  gl.vertexAttribPointer(
      this.aVertexPosition_, 3, goog.webgl.FLOAT, false, 0, 0);

  this.cube_.draw();
};
