/**
 * @fileoverview WebGL context wrapper.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.webgl.Context");

goog.require("goog.vec.Mat4");
goog.require("goog.webgl");

/**
 * Constructs a new WebGL context wrapper.
 * @param {!Element} canvas The Canvas container for WebGL.
 * @constructor
 */
cidev.webgl.Context = function(canvas) {
  /** @type {WebGLRenderingContext} */
  var gl = null;
  try {
    // TODO(joseph): Try "webgl" context type too.
    gl = canvas.getContext("experimental-webgl");
  } catch (e) { }
  if (!goog.isDefAndNotNull(gl)) {
    throw Error("could not initialize WebGL");
  }

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

  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

  /**
   * The field of view along the y (vertical) axis in radians.
   * @type {number}
   */
  this.fov = 0.75;

  /**
   * The x (width) to y (height) aspect ratio.
   * @type {number}
   */
  this.aspect = this.viewportWidth / this.viewportHeight;

  /**
   * The distance to the near clipping plane.
   * @type {number}
   */
  this.near = 0.1;

  /**
   * The distance to the far clipping plane.
   * @type {number}
   */
  this.far = 100.0;

  /** @type {goog.vec.Mat4} */
  this.projectionMatrix = goog.vec.Mat4.createFloat32Identity();

  /** @type {goog.vec.Mat4} */
  this.modelViewMatrix = goog.vec.Mat4.createFloat32Identity();
}
