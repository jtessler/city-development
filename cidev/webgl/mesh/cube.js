/**
 * @fileoverview The cube mesh subclass.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.mesh.Cube');

goog.require('cidev.webgl.mesh.Mesh');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @constructor
 * @extends {cidev.webgl.mesh.Mesh}
 */
cidev.webgl.mesh.Cube = function(context) {
  goog.base(this, context);

  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  //
  // Source:
  // https://www.khronos.org/registry/webgl/sdk/demos/webkit/resources/J3DI.js

  var vertices = new Float32Array(
      [  1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,    // v0-v1-v2-v3 front
         1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,    // v0-v3-v4-v5 right
         1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,    // v0-v5-v6-v1 top
        -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,    // v1-v6-v7-v2 left
        -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,    // v7-v4-v3-v2 bottom
         1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1 ]   // v4-v7-v6-v5 back
  );

  var indices = new Uint8Array(
      [  0, 1, 2,   0, 2, 3,    // front
         4, 5, 6,   4, 6, 7,    // right
         8, 9,10,   8,10,11,    // top
        12,13,14,  12,14,15,    // left
        16,17,18,  16,18,19,    // bottom
        20,21,22,  20,22,23 ]   // back
  );

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
