/**
 * @fileoverview The generic mesh model.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.webgl.Model");

goog.require("goog.vec.Mat4");
goog.require("goog.webgl");

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {!Array.<number>} vertices Model vertices in array form.
 * @constructor
 */
cidev.webgl.Model = function(context, vertices) {
  /** @const */ var VERTEX_DIM = 3;
  if (vertices.length % VERTEX_DIM != 0) {
    throw Error("invalid vertex array");
  }

  var gl = context.gl;
  /** @type {WebGLBuffer} */
  this.vertexBuffer = gl.createBuffer()
  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(goog.webgl.ARRAY_BUFFER, new Float32Array(vertices),
      goog.webgl.STATIC_DRAW);

  /** @type {number} */
  this.vertexCount = vertices.length / VERTEX_DIM;

  /** @type {!Float32Array} */
  this.modelMatrix = goog.vec.Mat4.createFloat32Identity();
}
