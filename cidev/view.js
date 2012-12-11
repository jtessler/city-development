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
 * @typedef {{building: !cidev.model.Building, input: !Element}}
 */
cidev.view.BuildingInput;

/**
 * Updates the properties DOM for the given model.
 * @param {!cidev.model.Building} building The model to build a panel for.
 */
cidev.view.propertyPanel = function(building) {
  cidev.view.clearPropertyPanel();

  // TODO(joseph): Don't access the database here.
  var selectElement = goog.dom.createDom('select', null,
      goog.array.map(cidev.database.getAll(),
          function(building, i, array) {
            return goog.dom.createDom('option', {
                  'value':  building.id,
                  'innerHTML': goog.string.buildString(
                      '(', i + 1, ') ', building.getType())
                })
          }));
  goog.events.listen(selectElement, goog.events.EventType.CHANGE,
      cidev.controller.switchBuilding, false, selectElement);
  selectElement.value = building.id; // Update the current selection.
  cidev.view.panel.appendChild(selectElement);

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
