/**
 * @fileoverview The entry point.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.init");

goog.require("cidev.scene.Scene");
goog.require("cidev.webgl.Context");

goog.require("goog.dom");

cidev.init = function() {
  /** @type {Element} */
  var canvas = goog.dom.getElement("canvas");
  if (goog.isDefAndNotNull(canvas)) {
    var context = new cidev.webgl.Context(canvas);
    var scene = new cidev.scene.Scene(context);

    cidev.render_(canvas, scene);
  } else {
    throw Error("canvas does not exist");
  }
}

/**
 * @private
 * @param {!Element} canvas the element to animate.
 * @param {!cidev.scene.Scene} scene the scene to draw.
 */
cidev.render_ = function(canvas, scene) {
  window.requestAnimFrame(cidev.render_, canvas);
  scene.draw();
}
