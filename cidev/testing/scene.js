/**
 * @fileoverview A simple scene for testing purposes.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.testing.Scene');

goog.require('cidev.webgl.Camera');
goog.require('cidev.webgl.Context');
goog.require('cidev.webgl.mesh.Cube');
goog.require('cidev.webgl.shader.Simple');
goog.require('cidev.webgl.shader.Skybox');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * @constructor
 * @implements {goog.fx.anim.Animated}
 */
cidev.testing.Scene = function(canvas) {
  /** @type {!cidev.webgl.Context} */
  this.context = new cidev.webgl.Context(canvas);

  /** @type {!cidev.webgl.Camera} */
  this.camera = new cidev.webgl.Camera();

  /** @type {!cidev.webgl.shader.Program} */
  this.simple = new cidev.webgl.shader.Simple(this.context);

  /** @type {!cidev.webgl.shader.Program} */
  this.skybox = new cidev.webgl.shader.Skybox(this.context);

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.cube = new cidev.webgl.mesh.Cube(this.context);

  /** @type {number} */
  this.lastTime = 0;
}

/**
 * @inheritDoc
 */
cidev.testing.Scene.prototype.onAnimationFrame = function(now) {
  this.context.gl.clear(
      goog.webgl.COLOR_BUFFER_BIT | goog.webgl.DEPTH_BUFFER_BIT);

  if (this.lastTime > 0) {
    this.camera.update(now - this.lastTime);
  }
  this.lastTime = now;

  this.simple.activate();
  goog.vec.Mat4.makeTranslate(this.cube.modelViewMatrix, 0, 0, 10);
  this.simple.render(this.cube, this.camera);

  this.skybox.activate();
  goog.vec.Mat4.makeScale(this.cube.modelViewMatrix, 30, 30, 30);
  this.skybox.render(this.cube, this.camera);
}
