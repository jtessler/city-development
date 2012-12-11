/**
 * @fileoverview A simple, static controller class, handling various events and
 * updating DOM / WebGL views.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.controller');

goog.require('cidev.database');
goog.require('cidev.model.BuildingType');
goog.require('cidev.model.PowerPlant');
goog.require('cidev.model.ResidentialBuilding');
goog.require('cidev.view');

goog.require('goog.array');
goog.require('goog.string');


/**
 * Initializes DOM elements and event listeners.
 * @param {Element} container The DOM element to fill.
 */
cidev.controller.setupContainer = function(container) {
  cidev.view.init(container);
};

/**
 * @param {*} e The handled event.
 */
cidev.controller.addResidentialBuilding = function(e) {
  cidev.controller.addBuilding_(new cidev.model.ResidentialBuilding());
};

/**
 * @param {*} e The handled event.
 */
cidev.controller.addPowerPlant = function(e) {
  cidev.controller.addBuilding_(new cidev.model.PowerPlant());
};

/**
 * @param {!cidev.model.Building} building The newly constructed building.
 * @private
 */
cidev.controller.addBuilding_ = function(building) {
  cidev.database.add(building);
  cidev.view.buildingSelector(cidev.database.getAll());
  cidev.view.propertyPanel(building);
};

/**
 * @this {!Element} The select element.
 * @param {*} e The handled event.
 */
cidev.controller.switchBuilding = function(e) {
  var building = cidev.database.get(this.value);
  if (goog.isDef(building)) {
    cidev.view.propertyPanel(building);
  }
};

/**
 * @this {!cidev.model.Building} The building being removed.
 * @param {*} e The handled event.
 */
cidev.controller.removeBuilding = function(e) {
  cidev.database.remove(this);
  var buildings = cidev.database.getAll();
  cidev.view.buildingSelector(buildings);
  if (goog.array.isEmpty(buildings)) {
    cidev.view.clearPropertyPanel();
  } else {
    cidev.view.propertyPanel(buildings[0]);
  }
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

/**
 * @this {!cidev.view.BuildingInput} The model to modify with the input.
 * @param {*} e The handled event.
 */
cidev.controller.updateRadius = function(e) {
  if (goog.string.isNumeric(this.input.value)) {
    this.building.radius = goog.string.parseInt(this.input.value);
  }
};
