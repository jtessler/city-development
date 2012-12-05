/**
 * @fileoverview The scene superclass, wrapping a shader program and basic
 * drawing functionality.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.scene.Scene');

goog.require('goog.webgl');

/**
 * The super class containing generic shader handling and other utility
 * functions.
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @constructor
 */
cidev.scene.Scene = function(context) {
  this.context = context;
  this.program = context.gl.createProgram();
};

/**
 * The current WebGL context wrapper.
 * @type {!cidev.webgl.Context}
 * @protected
 */
cidev.scene.Scene.prototype.context;

/**
 * The scene's WebGL shader program.
 * @type {!WebGLProgram}
 * @protected
 */
cidev.scene.Scene.prototype.program;

/**
 * Compile and link the given shaders.
 * @param {string} vs Vertex shader code.
 * @param {string} fs Fragment shader code.
 */
cidev.scene.Scene.prototype.initShaders = function(vs, fs) {
  var gl = this.context.gl;
  gl.attachShader(this.program,
      this.context.createShader(vs, goog.webgl.VERTEX_SHADER));
  gl.attachShader(this.program,
      this.context.createShader(fs, goog.webgl.FRAGMENT_SHADER));
  gl.linkProgram(this.program);

  if (!gl.getProgramParameter(this.program, goog.webgl.LINK_STATUS)) {
    throw Error('shader program error: ' + gl.getProgramInfoLog(this.program));
  }
};

/**
 * Performs all setup steps then calls the internal draw implementation.
 */
cidev.scene.Scene.prototype.draw = function() {
  this.context.gl.useProgram(this.program);
  this.drawScene();
}

/**
 * Draws the scene using the internal implementation.
 * @protected
 */
cidev.scene.Scene.prototype.drawScene = goog.abstractMethod;
