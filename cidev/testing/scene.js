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
goog.require('cidev.webgl.texture.Cubemap');
goog.require('cidev.webgl.texture.Texture2D');

goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * @param {!Element} canvas The canvas container for the scene.
 * @constructor
 * @implements {goog.fx.anim.Animated}
 */
cidev.testing.Scene = function(canvas) {
  /** @type {!cidev.webgl.Context} */
  this.context = new cidev.webgl.Context(canvas);

  /** @type {!cidev.webgl.Camera} */
  this.camera = new cidev.webgl.Camera(this.context);

  /** @type {!cidev.webgl.shader.Program} */
  this.simple = new cidev.webgl.shader.Simple(this.context);

  /** @type {!cidev.webgl.texture.Texture} */
  this.crate = new cidev.webgl.texture.Texture2D(
      this.context, 'textures/brick.jpg', 0);

  /** @type {!cidev.webgl.shader.Program} */
  this.skybox = new cidev.webgl.shader.Skybox(this.context);

  /** @type {!cidev.webgl.texture.Texture} */
  this.cubemap = new cidev.webgl.texture.Cubemap(
      this.context, 'textures/cubemap', 1);

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.cube = new cidev.webgl.mesh.Cube(this.context);

  /** @type {number} */
  this.lastTime = 0;
};

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
  // TODO(joseph): Fix this private member access.
  goog.vec.Mat4.makeTranslate(this.cube.modelMatrix_, 0, 0, 10);
  for (var i = 0; i < 3; i++) {
    this.simple.render(this.cube, this.camera, this.crate);
    goog.vec.Mat4.translate(this.cube.modelMatrix_, 0, 1, 0);
  }

  this.skybox.activate();
  // TODO(joseph): Fix this private member access.
  goog.vec.Mat4.makeScale(this.cube.modelMatrix_, 100, 100, 100);
  goog.vec.Mat4.translate(this.cube.modelMatrix_, -0.5, -0.5, -0.5);
  this.skybox.render(this.cube, this.camera, this.cubemap);
};
