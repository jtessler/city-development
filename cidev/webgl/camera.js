/**
 * @fileoverview The camera model-view matrix wrapper.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.webgl.Camera");

goog.require("goog.events.KeyCodes");
goog.require("goog.vec.Vec3");
goog.require("goog.vec.Mat4");

/**
 * @constructor
 */
cidev.webgl.Camera = function () {
  /** @type {!goog.vec.Vec3.Float32} */
  this.position = goog.vec.Vec3.createFloat32();

  /**
   * @type {!goog.vec.Mat4.Float32}
   * @private
   */
  this.matrix_ = goog.vec.Mat4.createFloat32();
};

/**
 * @return {!goog.vec.Mat4.Float32} The camera's model-view matrix.
 */
cidev.webgl.Camera.prototype.getMatrix = function() {
  var p = this.position;
  goog.vec.Mat4.makeTranslate(this.matrix_, p[0], p[1], p[2]);
  return this.matrix_;
}

/**
 * @param {!goog.events.KeyEvent} e The key event to handle.
 */
cidev.webgl.Camera.prototype.keyHandler = function(e) {
  var kc = goog.events.KeyCodes;
  switch (e.keyCode) {
    case kc.W: this.position[2]++;
               break;
    case kc.A: this.position[0]++;
               break;
    case kc.S: this.position[2]--;
               break;
    case kc.D: this.position[0]--;
               break;
  }
}
