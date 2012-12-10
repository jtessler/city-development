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
  this.attachShader_(vs, goog.webgl.VERTEX_SHADER);
  this.attachShader_(fs, goog.webgl.FRAGMENT_SHADER);
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
 * Sets up the render call, binding vertex attributes, uniforms, etc.
 * @param {!cidev.webgl.mesh.Mesh} mesh The mesh object to draw.
 * @param {!cidev.webgl.Camera} camera The view-matrix-wrapping camera.
 * @param {!cidev.webgl.texture.Texture=} opt_texture The (optional) texture
 *     to apply.
 * @protected
 */
cidev.webgl.shader.Program.prototype.setupRender = function(
    mesh, camera, opt_texture) {
  if (goog.isDef(opt_texture) && goog.isDef(this.texture)) {
    opt_texture.uniform1i(this.texture);
  }
};

/**
 * Renders the given object.
 * @param {!cidev.webgl.mesh.Mesh} mesh The mesh object to draw.
 * @param {!cidev.webgl.Camera} camera The view-matrix-wrapping camera.
 * @param {!cidev.webgl.texture.Texture=} opt_texture The (optional) texture
 *     to apply.
 */
cidev.webgl.shader.Program.prototype.render = function(
    mesh, camera, opt_texture) {
  this.setupRender(mesh, camera, opt_texture);
  mesh.bindIndexBuffer();
  this.context.gl.drawElements(
      goog.webgl.TRIANGLES, mesh.indexCount, goog.webgl.UNSIGNED_BYTE, 0);
};

/**
 * Compiles given shader source code into a WebGL shader object, then
 * attaches it to the current program.
 * @param {string} code GLSL plain text source.
 * @param {number} type Shader type, i.e. FRAGMENT_SHADER or VERTEX_SHADER.
 * @private
 */
cidev.webgl.shader.Program.prototype.attachShader_ = function(code, type) {
  var gl = this.context.gl;
  var shader = gl.createShader(type);
  gl.shaderSource(shader, code);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, goog.webgl.COMPILE_STATUS)) {
    throw Error('shader error: ' + gl.getShaderInfoLog(shader));
  } else if (goog.isNull(shader)) {
    throw Error('unknown shader error');
  }

  gl.attachShader(this.program, shader);
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

/**
 * The shader program's texture location.
 * NOTE: Subclasses will assign this member.
 * @type {WebGLUniformLocation}
 * @protected
 */
cidev.webgl.shader.Program.prototype.texture;
