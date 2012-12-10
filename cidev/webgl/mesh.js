/**
 * @fileoverview The mesh class, wrapping an OBJ file and the vertex attribute
 * buffers.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.mesh.Mesh');

goog.require('goog.webgl');

/**
 * TODO(joseph): Pass OBJ filename instead.
 * The representing any 3D object, exposing binds for each vertex attribute.
 * @param {!cidev.webgl.Context} context The current WebGL context.
 * @param {*} obj The OBJ file contents.
 * @constructor
 */
cidev.webgl.mesh.Mesh = function(context, obj) {
  this.context = context;

  var gl = context.gl;
  this.vertexBuffer_ = gl.createBuffer();
  this.textureUVBuffer_ = gl.createBuffer();
  this.normalBuffer_ = gl.createBuffer();
  this.indexBuffer_ = gl.createBuffer();

  this.bindVertexBuffer();
  gl.bufferData(goog.webgl.ARRAY_BUFFER, obj.vertices, goog.webgl.STATIC_DRAW);

  this.bindTextureUVBuffer();
  gl.bufferData(goog.webgl.ARRAY_BUFFER, obj.textureUVs,
      goog.webgl.STATIC_DRAW);

  this.bindNormalBuffer();
  gl.bufferData(goog.webgl.ARRAY_BUFFER, obj.normals, goog.webgl.STATIC_DRAW);

  this.bindIndexBuffer();
  gl.bufferData(
      goog.webgl.ELEMENT_ARRAY_BUFFER, obj.indices, goog.webgl.STATIC_DRAW);
  this.indexCount = obj.indices.length;
};

/**
 * The current WebGL context wrapper.
 * @type {!cidev.webgl.Context}
 */
cidev.webgl.mesh.Mesh.prototype.context;

/**
 * The vertex buffer object.
 * @type {!WebGLBuffer}
 * @private
 */
cidev.webgl.mesh.Mesh.prototype.vertexBuffer_;

/**
 * Binds vertex data to the GPU.
 */
cidev.webgl.mesh.Mesh.prototype.bindVertexBuffer = function() {
  this.context.gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this.vertexBuffer_);
};

/**
 * The texture UV buffer object.
 * @type {!WebGLBuffer}
 * @private
 */
cidev.webgl.mesh.Mesh.prototype.textureUVBuffer_;

/**
 * Binds texture UV data to the GPU.
 */
cidev.webgl.mesh.Mesh.prototype.bindTextureUVBuffer = function() {
  this.context.gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this.textureUVBuffer_);
};

/**
 * The normal buffer object.
 * @type {!WebGLBuffer}
 * @private
 */
cidev.webgl.mesh.Mesh.prototype.normalBuffer_;

/**
 * Binds normal data to the GPU.
 */
cidev.webgl.mesh.Mesh.prototype.bindNormalBuffer = function() {
  this.context.gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this.normalBuffer_);
};

/**
 * The index buffer object.
 * @type {!WebGLBuffer}
 * @private
 */
cidev.webgl.mesh.Mesh.prototype.indexBuffer_;

/**
 * Binds index data to the GPU.
 */
cidev.webgl.mesh.Mesh.prototype.bindIndexBuffer = function() {
  this.context.gl.bindBuffer(
      goog.webgl.ELEMENT_ARRAY_BUFFER, this.indexBuffer_);
};

/**
 * The total number of indices.
 * @type {number}
 */
cidev.webgl.mesh.Mesh.prototype.indexCount;
