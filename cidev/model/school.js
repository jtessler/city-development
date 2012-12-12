/**
 * @fileoverview The school building model.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.model.School');

goog.require('cidev.model.Building');
goog.require('cidev.model.BuildingType');

/**
 * @constructor
 * @extends {cidev.model.Building}
 */
cidev.model.School = function() {
  goog.base(this);
};
goog.inherits(cidev.model.School, cidev.model.Building);

/**
 * @inheritDoc
 */
cidev.model.School.prototype.getType = function() {
  return cidev.model.BuildingType.SCHOOL;
};

