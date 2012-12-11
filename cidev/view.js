/**
 * @fileoverview A simple, static view class providing DOM element creation,
 * destruction, and event registration.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.view');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.string');

/**
 * The panel container for all property displays and input boxes.
 * @type {!Element}
 */
cidev.view.panel;

/**
 * The select element containing all stored building models.
 * @type {!Element}
 */
cidev.view.selector;

/**
 * @typedef {{building: !cidev.model.Building, input: !Element}}
 */
cidev.view.BuildingInput;

/**
 * Initializes DOM elements and event listeners.
 * @param {Element} container The DOM element to fill.
 */
cidev.view.init = function(container) {
  goog.dom.removeChildren(container);

  var selectElement = goog.dom.createDom('select');
  goog.events.listen(selectElement, goog.events.EventType.CHANGE,
      cidev.controller.switchBuilding, false, selectElement);
  container.appendChild(selectElement);
  cidev.view.selector = selectElement;
  cidev.view.buildingSelector([]); // Starts with no buildings.

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
 * Updates the select element given a list of building models.
 * @param {Array.<!cidev.model.Building>} buildings The stored building models.
 */
cidev.view.buildingSelector = function(buildings) {
  goog.dom.removeChildren(cidev.view.selector);
  if (goog.array.isEmpty(buildings)) {
    cidev.view.selector.appendChild(
        goog.dom.createDom('option', null, 'Select a building to modify'));
  } else {
    goog.array.forEach(buildings,
        function(building, i, array) {
          this.appendChild(goog.dom.createDom('option',
              { 'value': building.id },
              goog.string.buildString('(', i + 1, ') ', building.getType())));
        }, cidev.view.selector);
  }
};

/**
 * Updates the properties DOM for the given model.
 * @param {!cidev.model.Building} building The model to build a panel for.
 */
cidev.view.propertyPanel = function(building) {
  cidev.view.clearPropertyPanel();
  cidev.view.selector.value = building.id; // Update the current selection.

  var removeElement = goog.dom.createDom('input',
      {'type': 'button', 'value': 'Remove Building'});
  goog.events.listen(removeElement, goog.events.EventType.CLICK,
      cidev.controller.removeBuilding, false, building);
  cidev.view.panel.appendChild(removeElement);

  var xElement = goog.dom.createDom('input',
      {'type': 'text', 'value': building.x});
  goog.events.listen(xElement, goog.events.EventType.CHANGE,
      cidev.controller.updateX, false,
      {building: building, input: xElement});
  cidev.view.panel.appendChild(xElement);

  var yElement = goog.dom.createDom('input',
      {'type': 'text', 'value': building.y});
  goog.events.listen(yElement, goog.events.EventType.CHANGE,
      cidev.controller.updateY, false,
      {building: building, input: yElement});
  cidev.view.panel.appendChild(yElement);

  switch (building.getType()) {
    case cidev.model.BuildingType.RESIDENTIAL:
      var floorCountElement = goog.dom.createDom('input',
          {'type': 'text', 'value': building.floorCount});
      goog.events.listen(floorCountElement, goog.events.EventType.CHANGE,
          cidev.controller.updateFloorCount, false,
          {building: building, input: floorCountElement});
      cidev.view.panel.appendChild(floorCountElement);
      break;
    case cidev.model.BuildingType.POWER_PLANT:
      var radiusElement = goog.dom.createDom('input',
          {'type': 'text', 'value': building.radius});
      goog.events.listen(radiusElement, goog.events.EventType.CHANGE,
          cidev.controller.updateRadius, false,
          {building: building, input: radiusElement});
      cidev.view.panel.appendChild(radiusElement);
  }
};

/**
 * Clears the properties DOM.
 */
cidev.view.clearPropertyPanel = function() {
  // Remove all previously attached listeners.
  goog.array.forEach(goog.dom.getChildren(cidev.view.panel),
      function(child, i, array) { goog.events.removeAll(child); });
  goog.dom.removeChildren(cidev.view.panel);
};
