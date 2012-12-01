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

    var render = function() {
      window.requestAnimFrame(render, canvas);
      scene.draw();
    };
    render();
  } else {
    throw Error("canvas does not exist");
  }
};
