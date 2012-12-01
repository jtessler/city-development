/**
 * @fileoverview The scene, including shader setup and drawing.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.scene.Scene");

goog.require("cidev.webgl.Model");
goog.require("cidev.webgl.shaders");

goog.require("goog.vec.Mat4");
goog.require("goog.webgl");

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @constructor
 */
cidev.scene.Scene = function(context) {
  /** @type {!cidev.webgl.Context} */
  this.context = context;

  var gl = context.gl;

  var vertexShader = context.createShader(
      cidev.webgl.shaders["vertex.vert"], goog.webgl.VERTEX_SHADER);
  var fragmentShader = context.createShader(
      cidev.webgl.shaders["fragment.frag"], goog.webgl.FRAGMENT_SHADER);

  /**
   * @type {!WebGLProgram}
   * @private
   */
  this.program_ = gl.createProgram();

  gl.attachShader(this.program_, vertexShader);
  gl.attachShader(this.program_, fragmentShader);
  gl.bindAttribLocation(this.program_, 0, "aVertexPosition");
  gl.linkProgram(this.program_);

  if (!gl.getProgramParameter(this.program_, goog.webgl.LINK_STATUS)) {
    throw Error("shader program error: " + gl.getProgramInfoLog(this.program_));
  }

  /**
   * @type {number}
   * @private
   */
  this.aVertexPosition_ = gl.getAttribLocation(
      this.program_, "aVertexPosition");

  /**
   * @type {WebGLUniformLocation}
   * @private
   */
  this.uPMatrix_ = gl.getUniformLocation(this.program_, "uPMatrix");

  /**
   * @type {WebGLUniformLocation}
   * @private
   */
  this.uMMatrix_= gl.getUniformLocation(this.program_, "uMMatrix");

  var vertices = [
       0.0,  1.0,  0.0,
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0
  ];
  /**
   * @type {!cidev.webgl.Model}
   * @private
   */
  this.triangle_ = new cidev.webgl.Model(context, vertices, 3);
}

cidev.scene.Scene.prototype.draw = function() {
  var gl = this.context.gl;

  gl.useProgram(this.program_);

  gl.clear(goog.webgl.COLOR_BUFFER_BIT | goog.webgl.DEPTH_BUFFER_BIT);

  goog.vec.Mat4.translate(this.triangle_.modelMatrix, 0.0, 0.0, -0.1);
  gl.uniformMatrix4fv(this.uPMatrix_, false, this.context.projectionMatrix);
  gl.uniformMatrix4fv(this.uMMatrix_, false, this.triangle_.modelMatrix);

  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this.triangle_.vertexBuffer);
  gl.enableVertexAttribArray(this.aVertexPosition_);
  gl.vertexAttribPointer(
      this.aVertexPosition_, this.triangle_.vertexDimension,
      goog.webgl.FLOAT, false, 0, 0);
  gl.drawArrays(goog.webgl.TRIANGLES, 0, this.triangle_.vertexCount);
}
