/**
 * @fileoverview WebGL context wrapper.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.webgl.Context");

goog.require("cidev.webgl.WebGLUtils");

goog.require("goog.vec.Mat4");
goog.require("goog.webgl");

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

  /** @type {!Float32Array} */
  this.projectionMatrix = goog.vec.Mat4.createFloat32();

  /** @type {!Float32Array} */
  this.modelViewMatrix = goog.vec.Mat4.createFloat32Identity();
}

/**
 * @return {(Array.<number> | Float32Array | Float64Array | null)}
 */
cidev.webgl.Context.prototype.makePerspective = function() {
  return goog.vec.Mat4.makePerspective(
      this.projectionMatrix, this.fov, this.aspect, this.near, this.far);
}

/**
 * Compile given shader code.
 * @param {string} code GLSL plain text source.
 * @param {number} type Shader type, e.g. FRAGMENT_SHADER or VERTEX_SHADER.
 * @return {!WebGLShader} Compiled shader.
 */
cidev.webgl.Context.prototype.createShader = function(code, type) {
  var gl = this.gl;
  var shader = gl.createShader(type);

  gl.shaderSource(shader, code);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, goog.webgl.COMPILE_STATUS)) {
    throw Error("shader error: " + gl.getShaderInfoLog(shader));
  } else if (goog.isNull(shader)) {
    throw Error("unknown shader error");
  }

  return shader;
}
