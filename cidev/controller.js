/**
 * @fileoverview A simple, static controller class, handling various events and
 * updating DOM / WebGL views.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.controller');

goog.require('cidev.database');
goog.require('cidev.model.ResidentialBuilding');
goog.require('cidev.view');

goog.require('goog.string');

/**
 * @param {*} e The handled event.
 */
cidev.controller.addBuilding = function(e) {
  var building = new cidev.model.ResidentialBuilding();
  cidev.database.add(building);
  cidev.view.propertyPanel(building);
};

/**
 * @this {!cidev.model.Building} The building being removed.
 * @param {*} e The handled event.
 */
cidev.controller.removeBuilding = function(e) {
  cidev.database.remove(this);
  cidev.view.clearPropertyPanel();
};

/**
 * @this {!cidev.view.BuildingInput} The model to modify with the input.
 * @param {*} e The handled event.
 */
cidev.controller.updateX = function(e) {
  if (goog.string.isNumeric(this.input.value)) {
    this.building.x = goog.string.parseInt(this.input.value);
  }
};

/**
 * @this {!cidev.view.BuildingInput} The model to modify with the input.
 * @param {*} e The handled event.
 */
cidev.controller.updateY = function(e) {
  if (goog.string.isNumeric(this.input.value)) {
    this.building.y = goog.string.parseInt(this.input.value);
  }
};

/**
 * @this {!cidev.view.BuildingInput} The model to modify with the input.
 * @param {*} e The handled event.
 */
cidev.controller.updateFloorCount = function(e) {
  if (goog.string.isNumeric(this.input.value)) {
    this.building.floorCount = goog.string.parseInt(this.input.value);
  }
};
