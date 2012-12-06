/**
 * @fileoverview WebGL context wrapper.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.Context');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * Constructs a new WebGL context wrapper.
 * @param {!Element} canvas The Canvas container for WebGL.
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

/**
 * Creates a WebGL context in a given canvas.
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
