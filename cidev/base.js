/**
 * @fileoverview The entry point.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.base');

goog.require('cidev.scene.SkyboxScene');
goog.require('cidev.scene.WorldScene');
goog.require('cidev.webgl.Camera');
goog.require('cidev.webgl.Context');

goog.require('goog.dom');
goog.require('goog.events');
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
    var skybox = new cidev.scene.SkyboxScene(context, camera);
    var scene = new cidev.scene.WorldScene(context, camera);

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
        scene.draw();
        skybox.draw();
      }
      lastTime = time;
    };
    render();
  } else {
    throw Error('canvas does not exist');
  }
};
goog.exportSymbol('init', cidev.base.init);
