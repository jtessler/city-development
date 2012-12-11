/**
 * @fileoverview The entry point.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.base');

goog.require('cidev.Scene');
goog.require('cidev.controller');

goog.require('goog.dom');
goog.require('goog.fx.anim');

/**
 * Initializes the WebGL context, event handlers, and draws the scene.
 */
cidev.base.init = function() {
  var canvas = goog.dom.getElement('canvas');
  if (goog.isDefAndNotNull(canvas)) {

    cidev.controller.setupContainer(goog.dom.getElement('container'));
    var scene = new cidev.Scene(canvas);

    // TODO(joseph): Find a better way to wait for everything to load.
    setTimeout(goog.partial(goog.fx.anim.registerAnimation, scene), 500);

  } else {
    throw Error('canvas does not exist');
  }
};
goog.exportSymbol('init', cidev.base.init);
