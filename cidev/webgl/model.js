/**
 * @fileoverview The mesh model interface.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.webgl.Model");

goog.require("goog.vec.Mat4");
goog.require("goog.webgl");

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @param {!Array.<number>} vertices Model vertices in array form.
 * @param {number} vertexDimension The size of each vertex.
 * @constructor
 */
cidev.webgl.Model = function(context, vertices, vertexDimension) {
  if (vertices.length % vertexDimension != 0) {
    throw Error("invalid vertex dimension " + vertexDimension
        + " for vertex count " + vertices.length);
  }
  var gl = context.gl;

  /** @type {WebGLBuffer} */
  this.vertexBuffer = gl.createBuffer()
  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(goog.webgl.ARRAY_BUFFER, new Float32Array(vertices),
      goog.webgl.STATIC_DRAW);

  /** @type {number} */
  this.vertexDimension = vertexDimension;

  /** @type {number} */
  this.vertexCount = vertices.length / vertexDimension;

  /** @type {!Float32Array} */
  this.modelMatrix = goog.vec.Mat4.createFloat32Identity();
}
