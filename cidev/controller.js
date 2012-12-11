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

goog.require('goog.dom');
goog.require('goog.object');
goog.require('goog.string');


/**
 * Initializes DOM elements and event listeners.
 * @param {Element} container The DOM element to fill.
 */
cidev.controller.setupContainer = function(container) {
  goog.dom.removeChildren(container);
  var addResidentialElement = goog.dom.createDom('input',
      {'type': 'button', 'value': 'Add Residential Building'});
  goog.events.listen(addResidentialElement, goog.events.EventType.CLICK,
      cidev.controller.addResidentialBuilding, false);
  container.appendChild(addResidentialElement);

  var addPowerPlantElement = goog.dom.createDom('input',
      {'type': 'button', 'value': 'Add Power Plant'});
  goog.events.listen(addPowerPlantElement, goog.events.EventType.CLICK,
      cidev.controller.addPowerPlant, false);
  container.appendChild(addPowerPlantElement);

  var propertyPanel = goog.dom.createDom('div');
  cidev.view.panel = propertyPanel;
  container.appendChild(propertyPanel);
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

/**
 * @this {!cidev.view.BuildingInput} The model to modify with the input.
 * @param {*} e The handled event.
 */
cidev.controller.updateRadius = function(e) {
  if (goog.string.isNumeric(this.input.value)) {
    this.building.radius = goog.string.parseInt(this.input.value);
  }
};