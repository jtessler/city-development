/**
 * @fileoverview The camera model-view matrix wrapper.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.webgl.Camera');

goog.require('goog.events');
goog.require('goog.events.KeyCodes');
goog.require('goog.vec.Mat4');
goog.require('goog.vec.Vec3');

/**
 * @constructor
 */
cidev.webgl.Camera = function() {
  /**
   * @type {!goog.vec.Vec3.Float32}
   * @private
   */
  this.position_ = goog.vec.Vec3.createFloat32();

  /**
   * @type {!goog.vec.Vec3.Float32}
   * @private
   */
  this.velocity_ = goog.vec.Vec3.createFloat32();

  /**
   * @type {number}
   * @private
   */
  this.pitch_ = 0;

  /**
   * @type {number}
   * @private
   */
  this.yaw_ = 0;

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
  goog.vec.Mat4.makeLookAt(
      this.matrix_,
      this.position_,
      [0, this.position_[1], 0],
      [0, 1, 0]);
  return this.matrix_;
};

/**
 * Updates the camera's position and rotations based determined by key presses
 * and mouse movement.
 */
cidev.webgl.Camera.prototype.update = function() {
  // TODO(joseph): Add dt.
  goog.vec.Vec3.add(this.position_, this.velocity_, this.position_);
};

/**
 * @param {*} e The event to handle.
 */
cidev.webgl.Camera.prototype.handleEvent = function(e) {
  var EventType = goog.events.EventType;
  switch (e.type) {
    case EventType.KEYUP:
    case EventType.KEYDOWN: this.handleKeyEvent_(e);
                            break;
    case EventType.MOUSEMOVE: this.handleMouseEvent_(e);
                              break;
    default: throw Error('invalid event type: ' + e.type);
  }
};

/**
 * @param {*} e The key event to handle.
 * @private
 */
cidev.webgl.Camera.prototype.handleKeyEvent_ = function(e) {
  var v = e.type == goog.events.EventType.KEYDOWN ? 0.1 : 0;
  var KeyCodes = goog.events.KeyCodes;
  switch (e.keyCode) {
    case KeyCodes.W: this.velocity_[2] = v;
                     break;
    case KeyCodes.A: this.velocity_[0] = v;
                     break;
    case KeyCodes.S: this.velocity_[2] = -v;
                     break;
    case KeyCodes.D: this.velocity_[0] = -v;
                     break;
  }
};

/**
 * @param {*} e The mouse event to handle.
 * @private
 */
cidev.webgl.Camera.prototype.handleMouseEvent_ = function(e) {
  // TODO(joseph): Figure this out.
  this.yaw_ = -(e.clientX - 500) / 500;
  this.pitch_ = -(e.clientY - 500) / 500;
};

/**
 * All event types handled by the camera.
 * @const
 * @type {Array.<goog.events.EventType>}
 */
cidev.webgl.Camera.EVENT_TYPES = [
    goog.events.EventType.KEYUP,
    goog.events.EventType.KEYDOWN,
    goog.events.EventType.MOUSEMOVE
];
