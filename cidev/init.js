/**
 * @fileoverview The entry point.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.init");

goog.require("cidev.scene.Scene");
goog.require("cidev.webgl.Context");
goog.require("cidev.webgl.Triangle");

goog.require("goog.dom");

cidev.init = function() {
  var canvas = goog.dom.getElement("canvas");
  var context = new cidev.webgl.Context(canvas);
  var scene = new cidev.scene.Scene(context);

  scene.draw();
}
