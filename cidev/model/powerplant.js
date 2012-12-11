/**
 * @fileoverview The power plant model, storing building properties.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.model.PowerPlant');

goog.require('cidev.model.Building');
goog.require('cidev.model.BuildingType');

/**
 * @constructor
 * @extends {cidev.model.Building}
 */
cidev.model.PowerPlant = function() {
  goog.base(this);

  /** @type {number} */
  this.radius = 1;
};
goog.inherits(cidev.model.PowerPlant, cidev.model.Building);

/**
 * @inheritDoc
 */
cidev.model.PowerPlant.prototype.getType = function() {
  return cidev.model.BuildingType.POWER_PLANT;
};

