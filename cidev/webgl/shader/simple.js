/**
 * @fileoverview A simple vertex and fragment shader.
 *
 * This class assumes the GLSL shader code includes everything specified in the
 * superclasses.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.shader.Simple');

goog.require('cidev.webgl.shader.MVPProgram');
goog.require('cidev.webgl.shader.glsl');

goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @constructor
 * @extends {cidev.webgl.shader.MVPProgram}
 */
cidev.webgl.shader.Simple = function(context) {
  goog.base(this,
      context,
      cidev.webgl.shader.glsl['simple.vert'],
      cidev.webgl.shader.glsl['white.frag']);
};
goog.inherits(cidev.webgl.shader.Simple, cidev.webgl.shader.MVPProgram);

/**
 * Renders the given object with the given camera.
 * @inheritDoc
 */
cidev.webgl.shader.Simple.prototype.render = function(mesh, camera) {
  goog.base(this, 'render', mesh, camera);

  mesh.bindVertexBuffer();
  this.context.gl.vertexAttribPointer(
      this.vertexPosition, 3, goog.webgl.FLOAT, false, 0, 0);
  mesh.draw();
};
