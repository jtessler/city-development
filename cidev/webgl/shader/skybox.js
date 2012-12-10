/**
 * @fileoverview A skybox environment mapping vertex and fragment shader.
 *
 * This class assumes the GLSL shader code includes everything specified in the
 * superclasses, plus the following:
 *
 *   uniform vec3 viewPosition; // The camera's position in world coordinates.
 *   uniform samplerCube cubeMapTexture;
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.shader.Skybox');

goog.require('cidev.webgl.shader.MVPProgram');

goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {!goog.vec.Mat4.Float32} matrix Pointer to the scene's model matrix.
 * @constructor
 * @extends {cidev.webgl.shader.MVPProgram}
 */
cidev.webgl.shader.Skybox = function(context, matrix) {
  goog.base(this, context, 'skybox.vert', 'skybox.frag', matrix);

  var gl = this.context.gl;

  /**
   * Location of camera's position in world coordinates.
   * @type {WebGLUniformLocation}
   * @private
   */
  this.viewPosition_ = gl.getUniformLocation(this.program, 'viewPosition');

  this.texture = gl.getUniformLocation(this.program, 'cubeMapTexture');
};
goog.inherits(cidev.webgl.shader.Skybox, cidev.webgl.shader.MVPProgram);

/**
 * Sets up the render call, binding vertex attributes, uniforms, etc.
 * @inheritDoc
 */
cidev.webgl.shader.Skybox.prototype.setupRender = function(
    mesh, camera, opt_texture) {
  goog.base(this, 'setupRender', mesh, camera, opt_texture);

  this.context.gl.uniform3fv(this.viewPosition_, camera.pos);
};
