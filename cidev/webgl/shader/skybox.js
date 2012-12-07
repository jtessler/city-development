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
goog.require('cidev.webgl.shader.glsl');
goog.require('cidev.webgl.texture.Cubemap');

goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @constructor
 * @extends {cidev.webgl.shader.MVPProgram}
 */
cidev.webgl.shader.Skybox = function(context) {
  goog.base(this,
      context,
      cidev.webgl.shader.glsl['skybox.vert'],
      cidev.webgl.shader.glsl['skybox.frag']);

  var gl = this.context.gl;

  /**
   * Location of camera's position in world coordinates.
   * @type {WebGLUniformLocation}
   * @private
   */
  this.viewPosition_ = gl.getUniformLocation(this.program, 'viewPosition');

  /**
   * Location of the cube map texture.
   * @type {WebGLUniformLocation}
   * @private
   */
  this.cubeMapTexture_ = gl.getUniformLocation(this.program, 'cubeMapTexture');

  /**
   * The cube environment map texture.
   * @type {!cidev.webgl.texture.Texture}
   * @private
   */
  this.cubemap_ = new cidev.webgl.texture.Cubemap(context);
};
goog.inherits(cidev.webgl.shader.Skybox, cidev.webgl.shader.MVPProgram);

/**
 * Renders the given object with the given camera.
 * @inheritDoc
 */
cidev.webgl.shader.Skybox.prototype.render = function(mesh, camera) {
  goog.base(this, 'render', mesh, camera);

  var gl = this.context.gl;
  gl.uniform1i(this.cubeMapTexture_, 0);
  camera.uniform3fv(this.viewPosition_);

  gl.activeTexture(goog.webgl.TEXTURE0);
  this.cubemap_.bindTexture();
  mesh.bindVertexBuffer();
  gl.vertexAttribPointer(this.vertexPosition, 3, goog.webgl.FLOAT, false, 0, 0);
  mesh.draw();
};
