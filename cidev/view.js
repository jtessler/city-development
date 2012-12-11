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

/**
 * Updates the properties DOM for the given model.
 * @param {cidev.model.Building} building The model to build a panel for.
 */
cidev.view.propertyPanel = function(building) {
  cidev.view.clearPropertyPanel();

  var removeElement = goog.dom.createDom('input',
      {'type': 'button', 'value': 'Remove Building'});
  goog.events.listen(removeElement, goog.events.EventType.CLICK,
      cidev.controller.removeBuilding, false, building);

  var xElement = goog.dom.createDom('input',
      {'type': 'text', 'value': building.x});
  goog.events.listen(xElement, goog.events.EventType.CLICK,
      cidev.controller.removeBuilding, false, building);
  var yElement = goog.dom.createDom('input',
      {'type': 'text', 'value': building.y});

  var panelElement = goog.dom.createDom('div', null,
      removeElement, xElement, yElement);

  if (building.getType() == cidev.model.BuildingType.RESIDENTIAL) {
    var floorCountElement = goog.dom.createDom('input',
        {'type': 'text', 'value': building.floorCount});
    panelElement.appendChild(floorCountElement);
  }

  goog.dom.getElement('container').appendChild(panelElement);
};

/**
 * Clears the properties DOM.
 */
cidev.view.clearPropertyPanel = function() {
  // TODO(joseph): Remove old listeners.
  goog.dom.removeChildren(goog.dom.getElement('container'));
};
