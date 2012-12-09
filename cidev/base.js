/**
 * @fileoverview The entry point.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.base');

goog.require('cidev.testing.Scene');
goog.require('cidev.webgl.Camera');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.fx.anim');

/**
 * Initializes the WebGL context, event handlers, and draws the scene.
 */
cidev.base.init = function() {
  /** @type {Element} */
  var canvas = goog.dom.getElement('canvas');
  if (goog.isDefAndNotNull(canvas)) {

    var scene = new cidev.testing.Scene(canvas);

    goog.events.listen(
        goog.dom.getDocument(),
        cidev.webgl.Camera.EVENT_TYPES,
        scene.camera);

    // TODO(joseph): Find a better way to wait for everything to load.
    setTimeout(goog.partial(goog.fx.anim.registerAnimation, scene), 500);

  } else {
    throw Error('canvas does not exist');
  }
};
goog.exportSymbol('init', cidev.base.init);
