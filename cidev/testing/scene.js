/**
 * @fileoverview A simple scene for testing purposes.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.testing.Scene');

goog.require('cidev.webgl.Camera');
goog.require('cidev.webgl.Context');
goog.require('cidev.webgl.mesh.Mesh');
goog.require('cidev.webgl.shader.DiffuseSpecular');
goog.require('cidev.webgl.shader.Skybox');
goog.require('cidev.webgl.texture.Cubemap');
goog.require('cidev.webgl.texture.Texture2D');

goog.require('goog.vec.Mat4');
goog.require('goog.vec.Vec3');
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
  this.camera.pos[0] = 5;
  this.camera.pos[1] = 1;

  /** @type {!goog.vec.Mat4.Float32} */
  this.matrix = goog.vec.Mat4.createFloat32Identity();

  /** @type {!cidev.webgl.shader.Program} */
  this.simple = new cidev.webgl.shader.DiffuseSpecular(
      this.context,
      this.matrix,
      goog.vec.Vec3.createFloat32FromValues(-40, 40, 40));

  /** @type {!cidev.webgl.texture.Texture} */
  this.concrete = new cidev.webgl.texture.Texture2D(
      this.context, 'textures/concrete.jpg', 0);

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.plant = new cidev.webgl.mesh.Mesh(this.context, 'power_plant.obj');

  /** @type {!cidev.webgl.shader.Program} */
  this.skybox = new cidev.webgl.shader.Skybox(this.context, this.matrix);

  /** @type {!cidev.webgl.texture.Texture} */
  this.cubemap = new cidev.webgl.texture.Cubemap(
      this.context, 'textures/cubemap', 1);

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.cube = new cidev.webgl.mesh.Mesh(this.context, 'cube.obj');

  /** @type {!cidev.webgl.texture.Texture} */
  this.grass = new cidev.webgl.texture.Texture2D(
      this.context, 'textures/grass.jpg', 3);

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.ground = new cidev.webgl.mesh.Mesh(this.context, 'ground.obj');

  /** @type {!cidev.webgl.texture.Texture} */
  this.facade = new cidev.webgl.texture.Texture2D(
      this.context, 'textures/building_flip.jpg', 4);

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.building = new cidev.webgl.mesh.Mesh(
      this.context, 'residential_building.obj');

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
  goog.vec.Mat4.makeTranslate(this.matrix, 5, 0, 5);
  for (var i = 0; i < 3; i++) {
    this.simple.render(this.building, this.camera, this.facade);
    goog.vec.Mat4.translate(this.matrix, 0, 2, 0);
  }

  goog.vec.Mat4.makeTranslate(this.matrix, 2, 0, 2);
  this.simple.render(this.plant, this.camera, this.concrete);

  for (var r = 0; r < 10; r++) {
    for (var c = 0; c < 10; c++) {
      goog.vec.Mat4.makeTranslate(this.matrix, r, 0, c);
      this.simple.render(this.ground, this.camera, this.grass);
    }
  }

  this.skybox.activate();
  goog.vec.Mat4.makeScale(this.matrix, 100, 100, 100);
  goog.vec.Mat4.translate(this.matrix, -0.5, -0.5, -0.5);
  this.skybox.render(this.cube, this.camera, this.cubemap);
};
