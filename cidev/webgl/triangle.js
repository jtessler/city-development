/**
 * @fileoverview A triangle mesh.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.webgl.Triangle");

goog.require("goog.webgl");

/**
 * @param {!cidev.webgl.Context} context The WebGL context wrapper.
 * @constructor
 */
cidev.webgl.Triangle = function(context) {
  var gl = context.gl;

  /** @type {WebGLBuffer} */
  this.vertexBuffer = gl.createBuffer();

  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this.vertexBuffer);
  var vertices = [
       0.0,  1.0,  0.0,
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0
  ];
  gl.bufferData(goog.webgl.ARRAY_BUFFER, new Float32Array(vertices),
      goog.webgl.STATIC_DRAW);

  /** @type {number} */
  this.itemSize = 3;

  /** @type {number} */
  this.numItems = 3;
}
