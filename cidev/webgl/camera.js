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
   * The camera's XYZ coordinates.
   * @type {!goog.vec.Vec3.Float32}
   * @private
   */
  this.pos_ = goog.vec.Vec3.createFloat32FromValues(0, 0, 0);

  /**
   * The camera's viewing direction (always unit length).
   * @type {!goog.vec.Vec3.Float32}
   * @private
   */
  this.dir_ = goog.vec.Vec3.createFloat32FromValues(0, 0, 1);

  /**
   * The camera's rotation about the X axis.
   * @type {number}
   * @private
   */
  this.pitch_ = Math.PI / 2;

  /**
   * The camera's rotation about the Y axis.
   * @type {number}
   * @private
   */
  this.yaw_ = Math.PI / 2;

  /**
   * The camera's change in rotation about the Y axis.
   * @type {number}
   * @private
   */
  this.yawDelta_ = 0;

  /**
   * The camera's change in position (frontwards and backwards).
   * @type {number}
   * @private
   */
  this.forwardDelta_ = 0;

  /**
   * The camera's change in position (right to left).
   * @type {number}
   * @private
   */
  this.strafeDelta_ = 0;

  /**
   * @type {boolean}
   * @private
   */
  this.mouseDown_ = false;

  /**
   * Last seen mouse X position.
   * @type {number}
   * @private
   */
  this.mouseX_ = -1;

  /**
   * Last seen mouse Y position.
   * @type {number}
   * @private
   */
  this.mouseY_ = -1;

  /**
   * The model-view matrix.
   * @type {!goog.vec.Mat4.Float32}
   * @private
   */
  this.matrix_ = goog.vec.Mat4.createFloat32();

  /**
   * Keep around a constructed vector for various calculations.
   * @type {!goog.vec.Vec3.Float32}
   * @private
   */
  this.tmpVec3_ = goog.vec.Vec3.createFloat32();
};

/**
 * @type {!goog.vec.Vec3.Float32}
 * @private
 */
cidev.webgl.Camera.UP_DIR_ = goog.vec.Vec3.createFloat32FromValues(0, 1, 0);

/**
 * @return {!goog.vec.Mat4.Float32} The camera's model-view matrix.
 */
cidev.webgl.Camera.prototype.getMatrix = function() {
  goog.vec.Mat4.makeLookAt(
      this.matrix_,
      this.pos_,
      goog.vec.Vec3.add(this.pos_, this.dir_, this.tmpVec3_),
      cidev.webgl.Camera.UP_DIR_);
  return this.matrix_;
};

/**
 * Updates the camera's position and rotations based determined by key presses
 * and mouse movement.
 * @param {number} dt The elapsed time.
 */
cidev.webgl.Camera.prototype.update = function(dt) {
  var Vec3 = goog.vec.Vec3;

  // Determine the change in position based on the camera's viewing direction.
  var posDelta = Vec3.createFloat32();
  Vec3.scale(this.dir_, this.forwardDelta_, posDelta);
  var strafeDir =
      Vec3.cross(this.dir_, cidev.webgl.Camera.UP_DIR_, this.tmpVec3_);
  Vec3.add(
      posDelta,
      Vec3.scale(strafeDir, this.strafeDelta_, this.tmpVec3_),
      posDelta);

  // Update the camera's position based on the elapsed time.
  Vec3.add(
      this.pos_,
      Vec3.scale(posDelta, dt, this.tmpVec3_),
      this.pos_);

  // Update the camera's viewing direction based on the elapsed time and the
  // current rotations.
  this.yaw_ += dt * this.yawDelta_;
  Vec3.setFromValues(this.dir_,
      Math.cos(this.yaw_) * Math.sin(this.pitch_),
      Math.cos(this.pitch_),
      Math.sin(this.yaw_) * Math.sin(this.pitch_));
};

/**
 * @param {*} e The event to handle.
 */
cidev.webgl.Camera.prototype.handleEvent = function(e) {
  var EventType = goog.events.EventType;
  switch (e.type) {
    case EventType.KEYUP:
    case EventType.KEYDOWN:
        this.handleKeyEvent_(e);
        break;
    case EventType.MOUSEDOWN:
        this.mouseDown_ = e.isMouseActionButton();
        break;
    case EventType.MOUSEUP:
        this.mouseDown_ = false;
        break;
    case EventType.MOUSEMOVE:
        this.handleMouseMoveEvent_(e);
        break;
    default: throw Error('invalid event type: ' + e.type);
  }
};

/**
 * @const
 * @type {number}
 */
cidev.webgl.Camera.KEY_SENSITIVITY = 0.05;

/**
 * @param {*} e The key event to handle.
 * @private
 */
cidev.webgl.Camera.prototype.handleKeyEvent_ = function(e) {
  var delta = e.type == goog.events.EventType.KEYDOWN ?
      cidev.webgl.Camera.KEY_SENSITIVITY : 0;
  var KeyCodes = goog.events.KeyCodes;
  switch (e.keyCode) {
    case KeyCodes.W: this.forwardDelta_ = delta;
                     break;
    case KeyCodes.A: this.strafeDelta_ = -delta;
                     break;
    case KeyCodes.S: this.forwardDelta_ = -delta;
                     break;
    case KeyCodes.D: this.strafeDelta_ = delta;
                     break;
    // TODO(joseph): Make these constants.
    case KeyCodes.Q: this.yawDelta_ = -delta / 5;
                     break;
    case KeyCodes.E: this.yawDelta_ = delta / 5;
                     break;
  }
};

/**
 * @const
 * @type {number}
 */
cidev.webgl.Camera.MOUSE_SENSITIVITY = 0.001;

/**
 * @param {*} e The mouse event to handle.
 * @private
 */
cidev.webgl.Camera.prototype.handleMouseMoveEvent_ = function(e) {
  if (this.mouseDown_ && this.mouseX_ >= 0 && this.mouseY_ >= 0) {
    this.yaw_ +=
        (e.clientX - this.mouseX_) * cidev.webgl.Camera.MOUSE_SENSITIVITY;
    this.pitch_ +=
        (this.mouseY_ - e.clientY) * cidev.webgl.Camera.MOUSE_SENSITIVITY;
  }
  this.mouseX_ = e.clientX;
  this.mouseY_ = e.clientY;
};

/**
 * All event types handled by the camera.
 * @const
 * @type {Array.<goog.events.EventType>}
 */
cidev.webgl.Camera.EVENT_TYPES = [
    goog.events.EventType.KEYUP,
    goog.events.EventType.KEYDOWN,
    goog.events.EventType.MOUSEDOWN,
    goog.events.EventType.MOUSEMOVE,
    goog.events.EventType.MOUSEUP
];
