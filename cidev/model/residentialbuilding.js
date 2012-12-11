/**
 * @fileoverview The residential building model, storing building properties.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.model.ResidentialBuilding');

goog.require('cidev.model.Building');
goog.require('cidev.model.BuildingType');

/**
 * @constructor
 * @extends {cidev.model.Building}
 */
cidev.model.ResidentialBuilding = function() {
  goog.base(this);

  /** @type {number} */
  this.floorCount = 1;
};
goog.inherits(cidev.model.ResidentialBuilding, cidev.model.Building);

/**
 * @inheritDoc
 */
cidev.model.ResidentialBuilding.prototype.getType = function() {
  return cidev.model.BuildingType.RESIDENTIAL;
};
