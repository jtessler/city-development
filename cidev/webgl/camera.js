/**
 * @fileoverview The camera model-view matrix wrapper.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide("cidev.webgl.Camera");

goog.require("goog.events");
goog.require("goog.events.KeyCodes");
goog.require("goog.vec.Vec3");
goog.require("goog.vec.Mat4");

/**
 * @constructor
 */
cidev.webgl.Camera = function () {
  /** @type {!goog.vec.Vec3.Float32} */
  this.position = goog.vec.Vec3.createFloat32();

  /** @type {!goog.vec.Vec3.Float32} */
  this.velocity = goog.vec.Vec3.createFloat32();

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

// TODO(joseph): Add dt.
cidev.webgl.Camera.prototype.update = function() {
  goog.vec.Vec3.add(this.position, this.velocity, this.position);
}

/**
 * @param {!goog.events.KeyEvent} e The key event to handle.
 */
cidev.webgl.Camera.prototype.handleEvent = function(e) {
  var v = e.type == goog.events.EventType.KEYDOWN ? 0.1 : 0;
  var kc = goog.events.KeyCodes;
  switch (e.keyCode) {
    case kc.W: this.velocity[2] = v;
               break;
    case kc.A: this.velocity[0] = v;
               break;
    case kc.S: this.velocity[2] = -v;
               break;
    case kc.D: this.velocity[0] = -v;
               break;
  }
}

/**
 * All event types handled by the camera.
 * @const
 */
cidev.webgl.Camera.EVENT_TYPES = [
    goog.events.EventType.KEYUP,
    goog.events.EventType.KEYDOWN
];
