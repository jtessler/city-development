/**
 * @fileoverview The model-view-projection matrix program superclass.
 *
 * This class assumes the GLSL shader code includes the following:
 *
 *   attribute vec3 vertexPosition;
 *   uniform mat4 modelMatrix; // The model transformation matrix.
 *   uniform mat4 viewMatrix; // The camera's tranformation matrix.
 *   uniform mat4 projMatrix; // The projection matrix.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.shader.MVPProgram');

goog.require('cidev.webgl.shader.Program');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {string} vs Vertex shader code.
 * @param {string} fs Fragment shader code.
 * @constructor
 * @extends {cidev.webgl.shader.Program}
 */
cidev.webgl.shader.MVPProgram = function(context, vs, fs) {
  goog.base(this, context, vs, fs);

  var gl = context.gl;

  this.vertexPosition = gl.getAttribLocation(this.program, 'vertexPosition');
  gl.enableVertexAttribArray(this.vertexPosition);

  this.projMatrix = gl.getUniformLocation(this.program, 'projMatrix');
  this.viewMatrix = gl.getUniformLocation(this.program, 'viewMatrix');
  this.modelMatrix = gl.getUniformLocation(this.program, 'modelMatrix');
};
goog.inherits(cidev.webgl.shader.MVPProgram, cidev.webgl.shader.Program);

/**
 * Renders the given object with the given camera.
 * NOTE: This simply sets up the shader program. Subclasses implement rendering.
 * @inheritDoc
 */
cidev.webgl.shader.MVPProgram.prototype.render = function(mesh, camera) {
  var gl = this.context.gl;
  gl.uniformMatrix4fv(this.projMatrix, false, this.context.projectionMatrix);
  gl.uniformMatrix4fv(this.viewMatrix, false, camera.getMatrix());
  gl.uniformMatrix4fv(this.modelMatrix, false, mesh.modelViewMatrix);
}

/**
 * Index of the vertex position attribute.
 * @type {number}
 * @protected
 */
cidev.webgl.shader.MVPProgram.prototype.vertexPosition;

/**
 * Location of the uniform projection matrix.
 * @type {WebGLUniformLocation}
 * @protected
 */
cidev.webgl.shader.MVPProgram.prototype.projMatrix;

/**
 * Location of the uniform view matrix.
 * @type {WebGLUniformLocation}
 * @protected
 */
cidev.webgl.shader.MVPProgram.prototype.viewMatrix;

/**
 * Location of the uniform model matrix.
 * @type {WebGLUniformLocation}
 * @protected
 */
cidev.webgl.shader.MVPProgram.prototype.modelMatrix;
