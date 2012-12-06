/**
 * @fileoverview The program superclass, wrapping a shader program and basic
 * drawing functionality.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.shader.Program');

goog.require('goog.webgl');

/**
 * The super class containing generic shader handling and other utility
 * functions.
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {string} vs Vertex shader code.
 * @param {string} fs Fragment shader code.
 * @constructor
 */
cidev.webgl.shader.Program = function(context, vs, fs) {
  this.context = context;

  var gl = context.gl;
  this.program = gl.createProgram();
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
 * Activates the current program. This caller MUST call this before rendering
 * any meshes.
 */
cidev.webgl.shader.Program.prototype.activate = function() {
  this.context.gl.useProgram(this.program);
};

/**
 * Renders the given object with the given camera.
 * @param {!cidev.webgl.mesh.Mesh} mesh The mesh object to draw.
 * @param {!cidev.webgl.Camera} camera The view-matrix-wrapping camera.
 */
cidev.webgl.shader.Program.prototype.render = function(mesh, camera) {
  throw Error('unimplemented render method');
};

/**
 * The current WebGL context wrapper.
 * @type {!cidev.webgl.Context}
 * @protected
 */
cidev.webgl.shader.Program.prototype.context;

/**
 * The scene's WebGL shader program.
 * @type {!WebGLProgram}
 * @protected
 */
cidev.webgl.shader.Program.prototype.program;
