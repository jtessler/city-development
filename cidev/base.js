/**
 * @fileoverview The entry point.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.base');

goog.require('cidev.webgl.Camera');
goog.require('cidev.webgl.Context');
goog.require('cidev.webgl.mesh.Cube');
goog.require('cidev.webgl.shader.Simple');
goog.require('cidev.webgl.shader.Skybox');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.vec.Mat4');
goog.require('goog.webgl');

/**
 * Initializes the WebGL context, event handlers, and draws the scene.
 */
cidev.base.init = function() {
  /** @type {Element} */
  var canvas = goog.dom.getElement('canvas');
  if (goog.isDefAndNotNull(canvas)) {
    var context = new cidev.webgl.Context(canvas);
    var camera = new cidev.webgl.Camera();
    var simple = new cidev.webgl.shader.Simple(context);
    var skybox = new cidev.webgl.shader.Skybox(context);
    var cube = new cidev.webgl.mesh.Cube(context);

    goog.events.listen(
        goog.dom.getDocument(),
        cidev.webgl.Camera.EVENT_TYPES,
        camera);

    // TODO(joseph): Refactor this to an animator class.
    var lastTime = 0;
    var render = function() {
      // Using R.A.F. defined by WebGLUtils.
      window.requestAnimFrame(render, canvas);

      context.gl.clear(
          goog.webgl.COLOR_BUFFER_BIT | goog.webgl.DEPTH_BUFFER_BIT);

      var time = new Date().getTime();
      if (lastTime > 0) {
        camera.update(time - lastTime);

        simple.activate();
        goog.vec.Mat4.makeTranslate(cube.modelViewMatrix, 0, 0, 10);
        simple.render(cube, camera);

        skybox.activate();
        goog.vec.Mat4.makeScale(cube.modelViewMatrix, 30, 30, 30);
        skybox.render(cube, camera);
      }
      lastTime = time;
    };
    render();
  } else {
    throw Error('canvas does not exist');
  }
};
goog.exportSymbol('init', cidev.base.init);
