/**
 * @fileoverview A simple, static controller class, handling various events and
 * updating DOM / WebGL views.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cidev.controller');

goog.require('cidev.model.ResidentialBuilding');
goog.require('cidev.view');

// TODO(joseph): Move this to a separate class.
cidev.controller.database = {};

/**
 * @param {*} e The handled event.
 */
cidev.controller.addBuilding = function(e) {
  var building = new cidev.model.ResidentialBuilding();
  building.id = 'in-memory-' + goog.getUid(building);
  cidev.controller.database[building.id] = building;
  cidev.view.propertyPanel(building);
};

/**
 * @this {cidev.model.Building} The building being removed.
 * @param {*} e The handled event.
 */
cidev.controller.removeBuilding = function(e) {
  delete cidev.controller.database[this.id];
  cidev.view.clearPropertyPanel();
};
