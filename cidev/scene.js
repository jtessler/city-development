/**
 * @fileoverview The WebGL scene, composed of an environment map, terrain, and a
 * set of buildings (taken from the database).
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.Scene');

goog.require('cidev.database');
goog.require('cidev.model.BuildingType');
goog.require('cidev.webgl.Camera');
goog.require('cidev.webgl.Context');
goog.require('cidev.webgl.mesh.Mesh');
goog.require('cidev.webgl.shader.DiffuseSpecular');
goog.require('cidev.webgl.shader.Skybox');
goog.require('cidev.webgl.texture.Cubemap');
goog.require('cidev.webgl.texture.Texture2D');

goog.require('goog.vec.Mat4');
goog.require('goog.vec.Vec3');

/**
 * @param {!Element} canvas The canvas container for the scene.
 * @constructor
 * @implements {goog.fx.anim.Animated}
 */
cidev.Scene = function(canvas) {

  /** @type {!cidev.webgl.Context} */
  this.context = new cidev.webgl.Context(canvas);

  /** @type {!cidev.webgl.Camera} */
  this.camera = new cidev.webgl.Camera(this.context);

  // Setup the initial camera position.
  this.camera.pos[0] = 5;
  this.camera.pos[1] = 1;

  /** @type {!goog.vec.Mat4.Float32} */
  this.modelMatrix = goog.vec.Mat4.createFloat32Identity();

  /**
   * Initialize the main shader with a light.
   * @type {!cidev.webgl.shader.Program}
   */
  this.shader = new cidev.webgl.shader.DiffuseSpecular(
      this.context,
      this.modelMatrix,
      goog.vec.Vec3.createFloat32FromValues(-100, 100, 100));

  /** @type {!cidev.webgl.shader.Program} */
  this.skybox = new cidev.webgl.shader.Skybox(this.context, this.modelMatrix);

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.cube = new cidev.webgl.mesh.Mesh(this.context, 'cube.obj');

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.terrain = new cidev.webgl.mesh.Mesh(this.context, 'ground.obj');

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.powerPlant = new cidev.webgl.mesh.Mesh(this.context, 'power_plant.obj');

  /** @type {!cidev.webgl.mesh.Mesh} */
  this.residential = new cidev.webgl.mesh.Mesh(
      this.context, 'residential_building.obj');

  /** @type {!cidev.webgl.texture.Texture} */
  this.facade = new cidev.webgl.texture.Texture2D(
      this.context, 'textures/building_flip.jpg', 0);

  /** @type {!cidev.webgl.texture.Texture} */
  this.concrete = new cidev.webgl.texture.Texture2D(
      this.context, 'textures/concrete.jpg', 1);

  /** @type {!cidev.webgl.texture.Texture} */
  this.grass = new cidev.webgl.texture.Texture2D(
      this.context, 'textures/grass.jpg', 2);

  /** @type {!cidev.webgl.texture.Texture} */
  this.cubemap = new cidev.webgl.texture.Cubemap(
      this.context, 'textures/cubemap', 3);

  /**
   * Last time seen (used to determine dt).
   * @type {number}
   * @private
   */
  this.lastTime_ = 0;
};

/**
 * @inheritDoc
 */
cidev.Scene.prototype.onAnimationFrame = function(now) {
  this.context.gl.clear(
      goog.webgl.COLOR_BUFFER_BIT | goog.webgl.DEPTH_BUFFER_BIT);

  if (this.lastTime_ > 0) {
    this.camera.update(now - this.lastTime_);
  }
  this.lastTime_ = now;

  this.shader.activate();
  goog.array.forEach(cidev.database.getAll(),
      function(building, i, array) { this.renderBuilding_(building); }, this);

  for (var r = 0; r < 10; r++) {
    for (var c = 0; c < 10; c++) {
      goog.vec.Mat4.makeTranslate(this.modelMatrix, r, 0, c);
      this.shader.render(this.terrain, this.camera, this.grass);
    }
  }

  this.skybox.activate();
  goog.vec.Mat4.makeScale(this.modelMatrix, 100, 100, 100);
  goog.vec.Mat4.translate(this.modelMatrix, -0.5, -0.5, -0.5);
  this.skybox.render(this.cube, this.camera, this.cubemap);
};

/**
 * @param {cidev.model.Building} building The building to render.
 * @private
 */
cidev.Scene.prototype.renderBuilding_ = function(building) {
  goog.vec.Mat4.makeTranslate(this.modelMatrix, building.x, 0, building.y);
  switch (building.getType()) {
    case cidev.model.BuildingType.RESIDENTIAL:
      for (var i = 0; i < building.floorCount; i++) {
        this.shader.render(this.residential, this.camera, this.facade);
        goog.vec.Mat4.translate(this.modelMatrix, 0, 2, 0);
      }
  }
};
