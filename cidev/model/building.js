/**
 * @fileoverview The building model super class, storing location and identifier
 * information.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.model.Building');

/**
 * @constructor
 */
cidev.model.Building = function() {
  /** @type {string} */
  this.id;

  /** @type {number} */
  this.x = 25;

  /** @type {number} */
  this.y = 25;
};

/**
 * @return {cidev.model.BuildingType} The model's building type.
 */
cidev.model.Building.prototype.getType = goog.abstractMethod;
