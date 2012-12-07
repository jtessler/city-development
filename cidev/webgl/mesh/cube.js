/**
 * @fileoverview The cube mesh subclass.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.mesh.Cube');

goog.require('cidev.webgl.mesh.Mesh');
goog.require('cidev.webgl.mesh.obj');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @constructor
 * @extends {cidev.webgl.mesh.Mesh}
 */
cidev.webgl.mesh.Cube = function(context) {
  goog.base(this, context);

  // TODO(joseph): Just make a generic class.
  var vertices = cidev.webgl.mesh.obj['cube.obj'].vertices;
  var indices = cidev.webgl.mesh.obj['cube.obj'].indices;

  /** @type {!WebGLRenderingContext} */
  var gl = context.gl;

  this.bindVertexBuffer();
  gl.bufferData(goog.webgl.ARRAY_BUFFER, vertices, goog.webgl.STATIC_DRAW);

  this.bindIndexBuffer();
  gl.bufferData(
      goog.webgl.ELEMENT_ARRAY_BUFFER, indices, goog.webgl.STATIC_DRAW);

  this.indexCount_ = indices.length;
};
goog.inherits(cidev.webgl.mesh.Cube, cidev.webgl.mesh.Mesh);

/**
 * @inheritDoc
 */
cidev.webgl.mesh.Cube.prototype.draw = function() {
  this.bindIndexBuffer();
  this.context.gl.drawElements(
      goog.webgl.TRIANGLES, this.indexCount_, goog.webgl.UNSIGNED_BYTE, 0);
};
