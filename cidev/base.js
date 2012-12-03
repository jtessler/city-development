/**
 * @fileoverview The entry point.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.base');

goog.require('cidev.scene.Scene');
goog.require('cidev.webgl.Camera');
goog.require('cidev.webgl.Context');

goog.require('goog.dom');
goog.require('goog.events');

/**
 * Initializes the WebGL context, event handlers, and draws the scene.
 */
cidev.base.init = function() {
  /** @type {Element} */
  var canvas = goog.dom.getElement('canvas');
  if (goog.isDefAndNotNull(canvas)) {
    var context = new cidev.webgl.Context(canvas);
    var camera = new cidev.webgl.Camera();
    var scene = new cidev.scene.Scene(context, camera);

    goog.events.listen(
        goog.dom.getDocument(),
        cidev.webgl.Camera.EVENT_TYPES,
        camera);

    var lastTime = 0;
    var render = function() {
      // Using R.A.F. defined by WebGLUtils.
      window.requestAnimFrame(render, canvas);

      var time = new Date().getTime();
      if (lastTime > 0) {
        camera.update(time - lastTime);
        scene.draw();
      }
      lastTime = time;
    };
    render();
  } else {
    throw Error('canvas does not exist');
  }
};
goog.exportSymbol('init', cidev.base.init);
