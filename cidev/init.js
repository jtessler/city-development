/**
 * @fileoverview The entry point.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.init");

goog.require("cidev.scene.Scene");
goog.require("cidev.webgl.Context");

goog.require("goog.dom");
goog.require("goog.events");
goog.require("goog.events.KeyHandler");

cidev.init = function() {
  /** @type {Element} */
  var canvas = goog.dom.getElement("canvas");
  if (goog.isDefAndNotNull(canvas)) {
    var context = new cidev.webgl.Context(canvas);
    var camera = new cidev.webgl.Camera();
    goog.events.listen(
        new goog.events.KeyHandler(goog.dom.getDocument()),
        goog.events.KeyHandler.EventType.KEY,
        /** @param {!goog.events.KeyEvent} e The event to handle. */
        function(e) { camera.keyHandler(e); });
    var scene = new cidev.scene.Scene(context, camera);

    var render = function() {
      // Using R.A.F. defined by WebGLUtils.
      window.requestAnimFrame(render, canvas);
      scene.draw();
    };
    render();
  } else {
    throw Error("canvas does not exist");
  }
};
