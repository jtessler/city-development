/**
 * @fileoverview WebGL context wrapper.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.Context');

goog.require('cidev.webgl.WebGLUtils');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * Constructs a new WebGL context wrapper.
 * @param {!Element} canvas The Canvas container for WebGL.
 * @constructor
 */
cidev.webgl.Context = function(canvas) {
  /** @type {!WebGLRenderingContext} */
  var gl = cidev.webgl.WebGLUtils.setupWebGL(canvas);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(goog.webgl.DEPTH_TEST);

  /** @type {!Element} */
  this.canvas = canvas;

  /** @type {!WebGLRenderingContext} */
  this.gl = gl;

  /** @type {number} */
  this.viewportWidth = canvas.width;

  /** @type {number} */
  this.viewportHeight = canvas.height;

  gl.viewport(0, 0, this.viewportWidth, this.viewportHeight);

  /**
   * The field of view along the y (vertical) axis in radians.
   * @type {number}
   */
  this.fov = Math.PI / 4;

  /**
   * The x (width) to y (height) aspect ratio.
   * @type {number}
   */
  this.aspect = this.viewportWidth / this.viewportHeight;

  /**
   * The distance to the near clipping plane.
   * @type {number}
   */
  this.near = 1.0;

  /**
   * The distance to the far clipping plane.
   * @type {number}
   */
  this.far = 100.0;

  // TODO(joseph): Refactor these variables, make private, add provider.
  /** @type {!goog.vec.Mat4.Float32} */
  this.projectionMatrix = goog.vec.Mat4.createFloat32();
  goog.vec.Mat4.makePerspective(
      this.projectionMatrix, this.fov, this.aspect, this.near, this.far);
};
