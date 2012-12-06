/**
 * @fileoverview The mesh super class.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.mesh.Mesh');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * The superclass representing any 3D object, exposing binds and drawing
 * capabilities.
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @constructor
 */
cidev.webgl.mesh.Mesh = function(context) {
  this.context = context;

  /** @type {!WebGLRenderingContext} */
  var gl = context.gl;
  this.vertexBuffer_ = gl.createBuffer();
  this.indexBuffer_ = gl.createBuffer();

  this.modelViewMatrix = goog.vec.Mat4.createFloat32Identity();
};

/**
 * The current WebGL context wrapper.
 * @type {!cidev.webgl.Context}
 * @protected
 */
cidev.webgl.mesh.Mesh.prototype.context;

/**
 * The vertex buffer object.
 * @type {!WebGLBuffer}
 * @private
 */
cidev.webgl.mesh.Mesh.prototype.vertexBuffer_;

/**
 * The index buffer object.
 * @type {!WebGLBuffer}
 * @private
 */
cidev.webgl.mesh.Mesh.prototype.indexBuffer_;

/**
 * The total number of indices.
 * @type {number}
 * @protected
 */
cidev.webgl.mesh.Mesh.prototype.indexCount;

/**
 * The mesh's model-view matrix.
 * @type {!goog.vec.Mat4.Float32}
 */
cidev.webgl.mesh.Mesh.prototype.modelViewMatrix;

/**
 * Binds vertex data to the GPU.
 */
cidev.webgl.mesh.Mesh.prototype.bindVertexBuffer = function() {
  this.context.gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this.vertexBuffer_);
};

/**
 * Binds index data to the GPU.
 */
cidev.webgl.mesh.Mesh.prototype.bindIndexBuffer = function() {
  this.context.gl.bindBuffer(
      goog.webgl.ELEMENT_ARRAY_BUFFER, this.indexBuffer_);
};

/**
 * Calls the appropriate draw method for the mesh.
 */
cidev.webgl.mesh.Mesh.prototype.draw = goog.abstractMethod;
