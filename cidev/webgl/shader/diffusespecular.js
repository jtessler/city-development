/**
 * @fileoverview A diffuse and specular lighting vertex and fragment shader.
 *
 * This class assumes the GLSL shader code includes everything specified in the
 * superclasses, plus the following:
 *
 *   uniform vec3 lightPosition; // The light's position in world coordinates.
 *
 *   uniform mat4 modelMatrix; // The model transformation matrix.
 *   uniform mat4 viewMatrix; // The camera's tranformation matrix.
 *   uniform mat4 projMatrix; // The projection matrix.
 *
 *   uniform vec4 ma; // The mesh's ambient term.
 *   uniform vec4 md; // The mesh's diffuse term.
 *   uniform vec4 ms; // The mesh's specular term.
 *   uniform float shininess;
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.shader.DiffuseSpecular');

goog.require('cidev.webgl.shader.TextureProgram');

goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {!goog.vec.Mat4.Float32} matrix Pointer to the scene's model matrix.
 * @param {!goog.vec.Vec3.Float32} pos The light's position in world space.
 * @constructor
 * @extends {cidev.webgl.shader.TextureProgram}
 */
cidev.webgl.shader.DiffuseSpecular = function(context, matrix, pos) {
  goog.base(
      this, context, 'diffuse_specular.vert', 'color_texture.frag', matrix);

  this.lightPositionVector_ = pos;

  var gl = this.context.gl;
  this.normal_ = gl.getAttribLocation(this.program, 'normal');
  gl.enableVertexAttribArray(this.normal_);

  this.lightPosition_ = gl.getUniformLocation(this.program, 'lightPosition');
  this.ma_ = gl.getUniformLocation(this.program, 'ma');
  this.md_ = gl.getUniformLocation(this.program, 'md');
  this.ms_ = gl.getUniformLocation(this.program, 'ms');
  this.shininess_ = gl.getUniformLocation(this.program, 'shininess');
};
goog.inherits(cidev.webgl.shader.DiffuseSpecular,
    cidev.webgl.shader.TextureProgram);

/**
 * Sets up the render call, binding vertex attributes, uniforms, etc.
 * @inheritDoc
 */
cidev.webgl.shader.DiffuseSpecular.prototype.setupRender = function(
    mesh, camera, opt_texture) {
  goog.base(this, 'setupRender', mesh, camera, opt_texture);

  var gl = this.context.gl;
  gl.uniform3fv(this.lightPosition_, false, this.lightPositionVector_);
  // TODO(joseph): Get these values.
  gl.uniform4fv(this.ma_, false, null);
  gl.uniform4fv(this.md_, false, null);
  gl.uniform4fv(this.ms_, false, null);
  gl.uniform1f(this.shininess_, false, 0.0);

  mesh.bindNormalBuffer();
  this.context.gl.vertexAttribPointer(
      this.normal_, 3, goog.webgl.FLOAT, false, 0, 0);
};

/**
 * Index of the vertex's normal attribute.
 * @type {number}
 * @private
 */
cidev.webgl.shader.DiffuseSpecular.prototype.normal_;

/**
 * The light's position in world coordinates.
 * @type {!goog.vec.Vec3.Float32}
 * @private
 */
cidev.webgl.shader.DiffuseSpecular.prototype.lightPositionVector_;

/**
 * Location of the uniform light position.
 * @type {WebGLUniformLocation}
 * @private
 */
cidev.webgl.shader.DiffuseSpecular.prototype.lightPosition_;

/**
 * Location of the uniform ambient term.
 * @type {WebGLUniformLocation}
 * @private
 */
cidev.webgl.shader.DiffuseSpecular.prototype.ma_;

/**
 * Location of the uniform diffuse term.
 * @type {WebGLUniformLocation}
 * @private
 */
cidev.webgl.shader.DiffuseSpecular.prototype.md_;

/**
 * Location of the uniform specular term.
 * @type {WebGLUniformLocation}
 * @private
 */
cidev.webgl.shader.DiffuseSpecular.prototype.sd_;

/**
 * Location of the uniform shininess intensity.
 * @type {WebGLUniformLocation}
 * @private
 */
cidev.webgl.shader.DiffuseSpecular.prototype.shininess_;
