/**
 * @fileoverview WebGL context wrapper.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.Context');

goog.require('cidev.webgl.provides.UniformMatrix4fv');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * Constructs a new WebGL context wrapper.
 * @param {!Element} canvas The Canvas container for WebGL.
 * @implements {cidev.webgl.provides.UniformMatrix4fv}
 * @constructor
 */
cidev.webgl.Context = function(canvas) {
  /** @type {!Element} */
  this.canvas = canvas;

  /** @type {!WebGLRenderingContext} */
  this.gl = cidev.webgl.Context.createWebGLContext(canvas);

  var gl = this.gl;
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(goog.webgl.DEPTH_TEST);

  /**
   * The field of view along the y (vertical) axis in radians.
   * @type {number}
   */
  this.fov = Math.PI / 4;

  /**
   * The distance to the near clipping plane.
   * @type {number}
   */
  this.near = 1.0;

  /**
   * The distance to the far clipping plane.
   * @type {number}
   */
  this.far = 200.0;

  /**
   * The projection matrix.
   * @type {!goog.vec.Mat4.Float32}
   */
  this.projMatrix_ = goog.vec.Mat4.createFloat32();

  this.update();
};

/**
 * Updates the viewport and projection matrix based on the canvas's size and
 * other user-mutable properties.
 */
cidev.webgl.Context.prototype.update = function() {
  this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  goog.vec.Mat4.makePerspective(
      this.projMatrix_,
      this.fov,
      this.canvas.width / this.canvas.height,
      this.near,
      this.far);
};

/**
 * Provides the shader the projection matrix.
 * @inheritDoc
 */
cidev.webgl.Context.prototype.uniformMatrix4fv = function(loc) {
  this.gl.uniformMatrix4fv(loc, false, this.projMatrix_);
}

/**
 * Creates a WebGL context in a given canvas in a browser-independent way.
 * @param {!Element} canvas The canvas tag from which to get context.
 * @return {!WebGLRenderingContext} The created context.
 */
cidev.webgl.Context.createWebGLContext = function(canvas) {
  if (!window.WebGLRenderingContext) {
    throw Error('unsupported browser');
  }

  var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
  var context = null;
  for (var i = 0; goog.isNull(context) && i < names.length; i++) {
    try {
      context = canvas.getContext(names[i]);
    } catch (e) { /* Do nothing. */ }
  }

  if (goog.isNull(context)) {
    throw Error('unsupported hardware');
  }

  return context;
};
